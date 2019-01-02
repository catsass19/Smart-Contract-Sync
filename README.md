# Smart-Contract-Sync
experimental package to reactively sync with contract status

## Observing Txs of DEXON or Ethereum inside of web worker
  It's a must in DEXON because DEXON is so fast. We dont want the main thread to be blocked.
## Be able to use web3 under web worker environment (bypass the any-promise issue)
  yup
## Initiate worker thread without loading external file
  so we don't worry about serving another file
