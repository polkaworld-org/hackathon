import { Keyring } from '@polkadot/api';
import config from './config';

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
}
