import { Link } from "react-router-dom";
import "../css/CatButtons.css";

function CatButtons({ kategorier }) {
  return (
    <div className="katknapp">
      <Link to="../productpage" key={"all"} state={{ kategori: "Se alla" }}>
        <button type="button" className="btn btn-outline-secondary katknapp">
          {"Se alla"}
        </button>
      </Link>
      {kategorier.map((item) => (
        <Link to="../productpage" key={item} state={{ kategori: item }}>
          <button type="button" className="btn btn-outline-secondary katknapp">
            {item}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default CatButtons;
