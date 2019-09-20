import { Keyring } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import './utils';
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

  localStorage.setItem(
    'currentAccount',
    JSON.stringify({
      address,
      mnemonic,
    })
  );

  currentAccount = config.find(a => a.address === address);
}

export function getAccountFromStorage() {
  const _account = localStorage.getItem('currentAccount');

  if (!_account) return null;

  const account = JSON.parse(_account);

  const configAccount = config.find(a => a.address === account.address);

  if (configAccount.mnemonic !== account.mnemonic) {
    localStorage.setItem('currentAccount', null);
    return null;
  }

  return configAccount;
}

export function getAccount() {
  return currentAccount;
}

export function vote(mnemonic, target, vote) {
  const account = new Keyring().addFromMnemonic(mnemonic).address;
  const signature = u8aToHex(account.sign(`${target}:${vote}`));
  const publicKey = u8aToHex(account.publicKey);
  console.log(publicKey);
}
