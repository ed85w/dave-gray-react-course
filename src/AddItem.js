import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ( {newItem, setNewItem, handleSubmit} ) => {

  //useRef used to return focus to the input field after th esubmit button has been clicked
  const inputRef = useRef('') 

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="add item"
        onClick={() => inputRef.current.focus()}

      >
        <FaPlus/>

      </button>

    </form>

  );
}
 
export default AddItem;