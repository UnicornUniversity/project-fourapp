import "./../../assets/styles/global.css";

function Card({ row }) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>Product 2</td>
      <td>Category 2</td>
      <td>
        <span>M</span>
        <span>L</span>
        <span>XL</span>
      </td>
      <td>$901.31</td>
      <td>
        <div class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </div>
      </td>
    </tr>
  );
}

export default Card;
