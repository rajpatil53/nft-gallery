export const NFTCard = ({ nft }) => {
  return (
    <div className="flex w-1/4 flex-col ">
      <div className="rounded-md">
        <img
          className="h-128 w-full rounded-t-md object-cover"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-md bg-slate-100 px-2 py-3 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
            Id: {`${nft.id.tokenId}`}
          </p>
          <p className="overflow-hidden text-ellipsis text-gray-600">{`${nft.contract.address}`}</p>
        </div>

        <div className="mt-2 flex-grow">
          <p className="overflow-hidden text-ellipsis text-gray-600">
            {nft.description}
          </p>
        </div>
      </div>
    </div>
  )
}
