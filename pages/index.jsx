import { useState } from 'react'
import { NFTCard } from '../components/nftCard'

const Home = () => {
  const [wallet, setWalletAddress] = useState(
    '0xaBA7161A7fb69c88e16ED9f455CE62B791EE4D03'
  )
  const [collection, setCollectionAddress] = useState(
    '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
  )
  const [nfts, setNfts] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(true)

  const fetchNFTs = async () => {
    let nfts
    console.log('fetching nfts')
    const api_key = 'AzMA9wzp0MI6-blXjSfbxL9ZXZp9U1my'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`
    var requestOptions = {
      method: 'GET',
    }

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log('fetching nfts for collection owned by address')
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log('nfts:', nfts)
      setNfts(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET',
      }
      const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )
      if (nfts) {
        console.log('NFTs in collection:', nfts)
        setNfts(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collection}
          type={'text'}
          placeholder="Add the collection address"
          disabled={!fetchForCollection}
        ></input>
        <label className="text-gray-600 ">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            checked={fetchForCollection}
            type={'checkbox'}
            className="mr-2"
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            'mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500'
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }}
        >
          Let's go!{' '}
        </button>
      </div>

      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {nfts.length &&
          nfts.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>
          })}
      </div>
    </div>
  )
}

export default Home
