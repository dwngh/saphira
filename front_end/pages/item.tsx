import { useState, useEffect } from "react"
import { ItemService } from "../service/ItemService"

const Item:React.FC = () => {
  const [items, setItems] = useState<any[]>([])
  const {getAllItem, getItem, createItem, updateItem, deleteItem} = ItemService()
  
  const fetchData = async () => {
    const temp = await getAllItem()
    console.log(temp)
    setItems(temp)
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default Item
