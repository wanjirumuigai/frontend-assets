export default function DataCard({title, number, icon: Component}){
  return (
    <>
      <div className="data-card bg-green-600 flex flex-row p-3 w-80 justify-around rounded-md">
        <div className="title-and-number flex flex-col rounded">
          <h1 className="text-5xl font-bold text-white">{number}</h1>
          <h1 className="text-lg font-bold text-white">{title}</h1>
        </div>
        <Component size={74}/>
      </div>
    </>
  )
}
