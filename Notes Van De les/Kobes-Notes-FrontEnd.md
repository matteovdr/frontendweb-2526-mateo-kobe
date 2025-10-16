les 1
verschil tussen props en state
props zijn immutable, state is mutable
bevoorbeeld:
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
dit is een state, want count kan veranderen
een prop is iets wat je meegeeft aan een component

# Les 3 - Notities

## Modules

Er zijn **heel veel modules**. Voor de **laatste module** moet je iets aanpassen Je moet **alle modules overlopen** voor je de laatste module aanpast: Gebruik dan de `useReducer` hook met een library

## React Optimalisatie

- Gebruik `useMemo` om **onnodige renders** te vermijden

## snelle notes

faker is een library die fake data kan genereren, maar ai kan dit ook met realistische data, faker gebruikt lorem ipsum

react-router is een library die routing in react apps mogelijk maakt

path * betekent dat alle paths die niet bestaan naar deze pagina gaan

voor parameters in routes gebruik je :parameterName

## extras

les 4
