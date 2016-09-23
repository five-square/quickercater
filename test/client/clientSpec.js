import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/App';
import Cart from '../../client/components/Cart';
import CartItemCard from '../../client/components/CartItemCard';
import CateringOptions from '../../client/components/CateringOptions';
import CompanyDescription from '../../client/components/CompanyDescription';
import CustomerForm from '../../client/components/CustomerForm';
import Dashboard from '../../client/components/Dashboard';
import Header from '../../client/components/Header';
import ItemCard from '../../client/components/ItemCard';
import Lobby from '../../client/components/Lobby';
import Login from '../../client/components/Login';
import MenuCard from '../../client/components/MenuCard';
import Navigation from '../../client/components/Navigation';
import OrderTable from '../../client/components/OrderTable';
import StoreCard from '../../client/components/StoreCard';
import StoreFront from '../../client/components/StoreFront';

global.describe('Component: App', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<App />)).to.be.above(0);
	});
});

global.describe('Component: Cart', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<Cart />)).to.be.above(0);
	});
});

global.describe('Component: CartItemCard', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<CartItemCard />)).to.be.above(0);
	});
});

global.describe('Component: CateringOptions', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<CateringOptions />)).to.be.above(0);
	});
});

global.describe('Component: CompanyDescription', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<CompanyDescription />)).to.be.above(0);
	});
});

global.describe('Component: CustomerForm', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<CustomerForm />)).to.be.above(0);
	});
});

global.describe('Component: Dashboard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Dashboard />).length).to.be.above(0);
  });
});

global.describe('Component: Header', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<Header />)).to.be.above(0);
	});
});

global.describe('Component: ItemCard', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<ItemCard />)).to.be.above(0);
	});
});

global.describe('Component: Lobby', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<Lobby />)).to.be.above(0);
	});
});

global.describe('Component: MenuCard', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<MenuCard />)).to.be.above(0);
	});
});

global.describe('Component: Navigation', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<Navigation />)).to.be.above(0);
	});
});

global.describe('Component: OrderTable', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<OrderTable />)).to.be.above(0);
	});
});

global.describe('Component: StoreCard', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<StoreCard />)).to.be.above(0);
	});
});

global.describe('Component: StoreFront', () => {
	global.it_('renders without exploding', () => {
		global.expect(shallow(<StoreFront />)).to.be.above(0);
	});
});