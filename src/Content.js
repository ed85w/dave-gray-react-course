import ItemList from "./ItemList"

const Content = ( {items, handleCheck, handleDelete} ) => {

  return (
    <main>
      {items.length ? (
        <ItemList 
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="no-items">No Items Today!</div>
      )}
    </main>
  )
}

export default Content
