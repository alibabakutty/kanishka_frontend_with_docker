import FetchPurchaseOrder from "../components/fetch/FetchPurchaseOrder";
import GatewayPage from "../components/gateway/GatewayPage";
import Home from "../components/Home";
import Login from "../components/login/LoginPage";
import PurchaseOrder from "../components/purchase_order/PurchaseOrder";

const routeConfig = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/gateway', element: <GatewayPage /> },
    { path: '/purchase_order', element: <PurchaseOrder /> },
    { path: '/fetch_purchase_order', element: <FetchPurchaseOrder /> },
    { path: '/update_purchase_order/:id', element: <PurchaseOrder /> }
];

export default routeConfig;