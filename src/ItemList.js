import ListItem from "./ListItem";

const ItemList = ( {items, handleCheck, handleDelete} ) => {
  return (
    <ul>
      {items.map((item) => (
        <ListItem 
          item={item}
          key={item.id}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}
 
export default ItemList;