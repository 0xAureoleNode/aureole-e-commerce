import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from '../../components/contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <CrwnLogo className="Logo" />
          </div>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* when there is user render different => sign out */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutAuthUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {/* if isCartOpen is true return CartDropDown , if this is false, then won't return anything*/}
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
