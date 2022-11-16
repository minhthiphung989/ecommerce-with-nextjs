import { Badge, Tooltip } from 'antd';
import Link from 'next/link';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from '../styles/Navbar.module.scss';
import { ShoppingOutlined } from '@ant-design/icons';

const Navbar= () => {
  const cart = useAppSelector((state: RootState) => state.cart.cart)
  const dispatch = useAppDispatch()
  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>KYO</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/menu">Menu</Link>
        </li>
        <li className={styles.navlink}>
          <Tooltip title={`$${cart.length}`} placement="bottom">
            <Link href="/cart" >
                <Badge count={cart.length}>
                    <ShoppingOutlined style={{ fontSize: '24px', color: '#555' }} />
                </Badge>
            </Link>
        </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;