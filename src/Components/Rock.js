//TODO: /rocks -> 
import { Link } from "react-router-dom";

export default function Rock({ rock }) {
  return (
    <tr>
      <td className="Rock">
        <Link to={`/rocks/${rock.id}`}>{rock.name}</Link>
      </td>
      <td>{rock.element}</td>
      <td>{rock.where_found}</td>
      <td>{rock.color}</td>
      <td>{rock.texture}</td>
      <td>{rock.luster}</td>
      <td>
        {rock.hardness ? <span>🪨</span> : <span>☁️</span>}
      </td>
    </tr>
  );
}
