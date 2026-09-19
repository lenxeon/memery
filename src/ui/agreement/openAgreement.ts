/**
 * @file openAgreement.ts
 * @description 用户协议弹窗的打开入口（全应用共用，无业务入参）。
 */
import { openDialog } from '../common/dialog';
import { AgreementPanel } from './AgreementPanel';

export const openAgreement = () => openDialog(AgreementPanel, {}, { width: '54rem' });
