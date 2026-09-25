/**
 * @file useHallDirectory.ts
 * @description 堂轩名录状态机：主奉纪念堂信息、堂轩清单（本地持久化）、名录 / 筹建对话框。
 *
 * 与供案陈设（useAuditStage）、环境（useHallAmbience）、献供（useOfferings）互不依赖：
 * 本 hook 只回答「当前供奉的是谁、有哪些堂轩、如何切换与筹建」。
 */
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MemorialHallItem, MemorialInfo } from '../../../types';
import { DEFAULT_MEMORIAL_HALLS, INITIAL_MEMORIAL } from '../../../data/sceneItems';
import { openCreateHall, openHallDirectory } from '../directory';

const HALLS_KEY = 'memery_memorial_halls';
const CURRENT_HALL_KEY = 'memery_current_hall_id';

/** 本地存储读写统一降级：隐私模式或配额异常时静默忽略；脏数据直接丢弃 */
const readStore = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    try {
      return JSON.parse(saved) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * 读取字符串型存储。
 * 兼容历史版本以裸字符串写入的 currentHallId（如 `hall_father`，未过 JSON.stringify），
 * 否则 JSON.parse 会抛错并中断名录初始化。
 */
const readStringStore = (key: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return '';
    try {
      const parsed = JSON.parse(saved) as unknown;
      return typeof parsed === 'string' ? parsed : String(parsed ?? '');
    } catch {
      return saved;
    }
  } catch (e) {
    console.error(e);
    return '';
  }
};

const writeStore = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export interface UseHallDirectoryOptions {
  showToast: (message: string) => void;
}

export interface HallDirectoryState {
  /** 当前主奉纪念堂（用于遗像与龛位题名） */
  memorial: MemorialInfo;
  setMemorial: Dispatch<SetStateAction<MemorialInfo>>;
  /** 堂轩总数 */
  hallCount: number;
  /** 顶栏展示用的堂轩短名（无堂轩时回落「堂轩名录」） */
  hallName: string;
  /** 打开堂轩名录 */
  openMemorialList: () => void;
  /** 打开筹建新堂轩 */
  openCreateMemorial: () => void;
}

export const useHallDirectory = ({ showToast }: UseHallDirectoryOptions): HallDirectoryState => {
  const [memorial, setMemorial] = useState<MemorialInfo>(INITIAL_MEMORIAL);

  const [memorialHalls, setMemorialHalls] = useState<MemorialHallItem[]>(() => {
    const saved = readStore<MemorialHallItem[]>(HALLS_KEY);
    return Array.isArray(saved) ? saved : DEFAULT_MEMORIAL_HALLS;
  });

  const [currentHallId, setCurrentHallId] = useState<string>(
    () => readStringStore(CURRENT_HALL_KEY) || DEFAULT_MEMORIAL_HALLS[0]?.id || ''
  );

  const currentHall = memorialHalls.find((h) => h.id === currentHallId) || memorialHalls[0];

  const handleSelectHall = useCallback(
    (hall: MemorialHallItem) => {
      setCurrentHallId(hall.id);
      writeStore(CURRENT_HALL_KEY, hall.id);
      setMemorial({
        title: hall.title,
        subtitle: `${hall.relationship} ${hall.name} ${hall.birthDate ? `(${hall.birthDate})` : ''}`,
        photoUrl: hall.photoUrl,
      });
      showToast(`已步入《${hall.title}》· 守护 ${hall.name}`);
    },
    [showToast]
  );

  // 筹建新堂轩并设为当前主奉
  const handleCreateHall = useCallback(
    (newHall: MemorialHallItem) => {
      setMemorialHalls((prev) => {
        const next = [newHall, ...prev];
        writeStore(HALLS_KEY, next);
        return next;
      });
      handleSelectHall(newHall);
      showToast(`新堂轩《${newHall.title}》已筹建落成`);
    },
    [handleSelectHall, showToast]
  );

  const openCreateMemorial = useCallback(() => {
    const handle = openCreateHall({
      onCreate: (newHall: MemorialHallItem) => {
        handleCreateHall(newHall);
        handle.close();
      },
    });
  }, [handleCreateHall]);

  const openMemorialList = useCallback(() => {
    const handle = openHallDirectory({
      halls: memorialHalls,
      currentHallId,
      onSelectHall: handleSelectHall,
      onOpenCreate: () => {
        handle.close();
        openCreateMemorial();
      },
      onClearHalls: () => {
        setMemorialHalls([]);
        writeStore(HALLS_KEY, []);
        showToast('已清空当前堂轩列表（供体验空状态引导创建流程）');
      },
      onLoadSampleHalls: () => {
        setMemorialHalls(DEFAULT_MEMORIAL_HALLS);
        setCurrentHallId(DEFAULT_MEMORIAL_HALLS[0].id);
        writeStore(HALLS_KEY, DEFAULT_MEMORIAL_HALLS);
        writeStore(CURRENT_HALL_KEY, DEFAULT_MEMORIAL_HALLS[0].id);
        showToast('已恢复预置示例纪念堂');
      },
    });
  }, [currentHallId, handleSelectHall, memorialHalls, openCreateMemorial, showToast]);

  return {
    memorial,
    setMemorial,
    hallCount: memorialHalls.length,
    hallName: currentHall ? currentHall.title.split('·')[0].trim() : '堂轩名录',
    openMemorialList,
    openCreateMemorial,
  };
};
