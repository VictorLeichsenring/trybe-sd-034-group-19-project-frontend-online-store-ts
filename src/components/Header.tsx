import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <NavLink data-testid="Shopping-cart-button" to="/cart" />

    </div>
  );
}
