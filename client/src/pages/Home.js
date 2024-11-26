import NavBar from "../containers/header/NavBar";
import "../assets/styles/table.css";

function App() {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <table class="product-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" class="select-all" />
                </th>
                <th>Product</th>
                <th>Category</th>
                <th>Size</th>
                <th>Price USD</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Product 1</td>
                <td>Category 1</td>
                <td>
                  <span>S</span>
                  <span>M</span>
                  <span>L</span>
                  <span>XL</span>
                </td>
                <td>$452.85</td>
                <td>
                  <div class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>
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
            </tbody>
          </table>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
