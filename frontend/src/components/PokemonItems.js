import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react'
import { getPokemonItems } from "../store/items";
const PokemonItems = ({ pokemon, setEditItemId }) => {
  const dispatch= useDispatch();
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });
  useEffect(() => {
    console.log ("DISPATCH IS RUNNING")
    console.log ("pokeID : ",pokemon.id)
    const results =  dispatch(getPokemonItems(pokemon.id));
    console.log ("DIDITWORK? ", results)
  }, [dispatch]);

  if (!items) {
    console.log ("I HAVE NO ITEMS")
    return null;
  }
  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button>
            Delete
          </button>
        </td>

      )}
    </tr>
  ));
};

export default PokemonItems;
