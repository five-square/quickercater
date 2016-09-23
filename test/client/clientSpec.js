//require(global.TEST_HELPER); // <--- This must be at the top of every test file.
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/App';
import Cart from '../../client/components/Cart';
import CartItemCard from '../../client/components/CartItemCard';
import CateringOptions from '../../client/components/CateringOptions';
import CompanyDescription from '../../client/components/CompanyDescription';
import CustomerForm from '../../client/components/CustomerForm';
import Dashboard from '../../client/components/Dashboard';
import ItemCard from '../../client/components/ItemCard';
import Lobby from '../../client/components/Lobby';
import Login from '../../client/components/Login';
import MenuCard from '../../client/components/MenuCard';
import Navigation from '../../client/components/Navigation';
import OrderTable from '../../client/components/OrderTable';
import StoreCard from '../../client/components/StoreCard';
import StoreFront from '../../client/components/StoreFront';
import orderAPI from '../../client/models/orderAPI';

global.describe('Component: App', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<App />)).to.be.above(0);
=======
		expect(shallow(<App />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<App />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: Cart', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<Cart />)).to.be.above(0);
=======
		expect(shallow(<Cart />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<Cart />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: CartItemCard', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<CartItemCard />)).to.be.above(0);
=======
		expect(shallow(<CartItemCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<CartItemCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: CateringOptions', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<CateringOptions />)).to.be.above(0);
=======
		expect(shallow(<CateringOptions />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<CateringOptions />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: CompanyDescription', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<CompanyDescription />)).to.be.above(0);
=======
		expect(shallow(<CompanyDescription />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<CompanyDescription />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: CustomerForm', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<CustomerForm />)).to.be.above(0);
=======
		expect(shallow(<CustomerForm />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<CustomerForm />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: Dashboard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Dashboard />).length).to.be.above(0);
  });
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
});

global.describe('Component: Header', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<Header />)).to.be.above(0);
	});
=======
=======
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
  global.it('has access to OrderAPI helper functions', () => {
  	 orderAPI.getPendingOrders(646).then(resp => {
      global.expect(resp).to.not.be(undefined);
      global.expect(resp).to.not.deep.equal({});
    });
  });
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
});

global.describe('Component: ItemCard', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<ItemCard />)).to.be.above(0);
=======
		expect(shallow(<ItemCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<ItemCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: Lobby', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<Lobby />)).to.be.above(0);
=======
		expect(shallow(<Lobby />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<Lobby />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: MenuCard', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<MenuCard />)).to.be.above(0);
=======
		expect(shallow(<MenuCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<MenuCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: Navigation', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<Navigation />)).to.be.above(0);
=======
		expect(shallow(<Navigation />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<Navigation />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: OrderTable', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<OrderTable />)).to.be.above(0);
=======
		expect(shallow(<OrderTable />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<OrderTable />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: StoreCard', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<StoreCard />)).to.be.above(0);
=======
		expect(shallow(<StoreCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<StoreCard />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});

global.describe('Component: StoreFront', () => {
	global.it('renders without exploding', () => {
<<<<<<< 375e2b176203eb0312676052808b5c0a59d4b921
<<<<<<< a0dd81f61fe714bbe39542b5cd0121786129f044
		global.expect(shallow(<StoreFront />)).to.be.above(0);
=======
		expect(shallow(<StoreFront />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
=======
		expect(shallow(<StoreFront />).length).to.be.above(0);
>>>>>>> Starting work on OrderAPI. Continuing work on Dashboard
	});
});