import { Keyring } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
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

  currentAccount = {
    ...config.find(a => a.address === address),
    address,
    mnemonic,
  };
}

export function getAccountFromStorage() {
  const _account = localStorage.getItem('currentAccount');

  if (!_account) return null;

  const account = JSON.parse(_account);

  if (!account) return null;

  const configAccount = {
    ...config.find(a => a.address === account.address),
    ...account,
  };

  return configAccount;
}

export function getAccount() {
  return currentAccount;
}

export function vote(target, score) {
  const mnemonic = getAccount().mnemonic;
  const account = new Keyring().addFromMnemonic(mnemonic);
  const signature = u8aToHex(account.sign(`${target}:${score}`));
  const publicKey = u8aToHex(account.publicKey);

  return fetch('https://api.polkaworld.org/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      signature,
      publicKey,
      target,
      score,
    }),
  }).then(function(response) {
    return response.json();
  });
}

export function setStatus(close) {
  return fetch('https://api.polkaworld.org/setstatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: close ? '1' : '0',
    }),
  }).then(function(response) {
    return response.json();
  });
}
