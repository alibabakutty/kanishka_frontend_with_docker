import FetchItemPurchaseOrder from "../components/fetch/FetchItemPurchaseOrder";
import FetchPurchaseOrder from "../components/fetch/FetchPurchaseOrder";
import GatewayPage from "../components/gateway/GatewayPage";
import Home from "../components/Home";
import Login from "../components/login/LoginPage";
import CustomerMaster from "../components/master/CustomerMaster";
import InventoryMaster from "../components/master/InventoryMaster";
import PurchaseOrder from "../components/purchase_order/PurchaseOrder";

const routeConfig = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/gateway', element: <GatewayPage /> },
    { path: '/purchase_order', element: <PurchaseOrder /> },
    { path: '/fetch_purchase_order', element: <FetchPurchaseOrder /> },
    { path: '/fetch_item_purchase_order', element: <FetchItemPurchaseOrder /> },
    { path: '/update_purchase_order/:id', element: <PurchaseOrder /> },
    { path: '/customers', element: <CustomerMaster /> },
    { path: '/inventory', element: <InventoryMaster /> }
];

export default routeConfig;