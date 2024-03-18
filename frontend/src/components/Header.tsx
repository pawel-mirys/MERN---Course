import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '@/assets/logo.png';
import { useAppSelector, useAppDispatch } from '@/store';
import { useLogoutMutation } from '@/store/apis/usersApi';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const navItemToRender = () => {
    let content: React.ReactNode;

    if (userInfo) {
      content = (
        <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to={'/profile'}>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      content = (
        <LinkContainer to={'/login'}>
          <Nav.Link>
            <FaUser /> Sign In
          </Nav.Link>
        </LinkContainer>
      );
    }
    return content;
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to={'/cart'}>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='info' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {navItemToRender()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
