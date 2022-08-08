import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");
const aliases = {
  schemas: {
      basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',


  },
  definitions: {
      BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
  },
  tiles: {},
};
const datastore = new DIDDataStore({ ceramic, model: aliases });

export const CeramicMixin = (superClass) => {
  class CeramicMixinElement extends superClass {
    static properties = {
      _ceramic: {type: Object},
      _aliases: {type: Object},
      _datastore: {type: Object}
    };

    constructor() {
      super();
      this._ceramic = ceramic;
      this._aliases = aliases;
      this._datastore = datastore;
    };

    async authenticateWithEthereum(ethereumProvider) {
      const accounts = await ethereumProvider.request({
        method: 'eth_requestAccounts',
      })
      const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
      const session = new DIDSession({ authProvider })
      const did = await session.authorize()
      this._ceramic.did = did
    };
  }
  return CeramicMixinElement;
}