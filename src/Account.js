import { Keyring } from '@polkadot/api';
import config from './config';

let currentAccount = getAccountFromStorage();

window.addEventListener('storage', function(e) {
  currentAccount = getAccountFromStorage();
});

export { mnemonicValidate } from '@polkadot/util-crypto';

export function mnemonicExist(mnemonic) {
  const account = new Keyring().addFromMnemonic(mnemonic);
  const address = account.address;
  return !!config.find(a => a.address === address);
}

export function saveAccount(mnemonic) {
  const account = new Keyring().addFromMnemonic(mnemonic);
  const address = account.address;

  const save = {
    address,
    mnemonic,
  };

  localStorage.setItem('currentAccount', JSON.stringify(save));

  currentAccount = save;
}

export function getAccountFromStorage() {
  const _account = localStorage.getItem('currentAccount');

  if (!_account) return null;

  const account = JSON.parse(_account);

  const configAccount = config.find(a => a.address === account.address);

  if (configAccount.mnemonic !== account.mnemonic) {
    localStorage.setItem('currentAccount', '');
    return null;
  }

  return account;
}

export function getAccount() {
  return currentAccount;
}
