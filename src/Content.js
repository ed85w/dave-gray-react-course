import ItemList from "./ItemList"

const Content = ( {items, handleCheck, handleDelete} ) => {

  return (
    // <> is a fragment 
    <> 
      {items.length ? (
        <ItemList 
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="no-items">No Items Today!</div>
      )}
    </>
  )
}

export default Content
