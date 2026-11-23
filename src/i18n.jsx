import { createContext, useContext, useEffect, useState } from 'react';

const dict = {
  zh: {
    appName: 'PartyBox 派对盒子', slogan: '充气城堡 · 水上游戏 · 派对套餐 一站式出租',
    home: '首页', categories: '分类', cart: '购物车', me: '我的',
    featured: '热门推荐', allCats: '全部分类', blog: '派对攻略', viewAll: '查看全部',
    perDay: '/天', size: '尺寸', age: '适合年龄', staff: '含工作人员', yes: '是', no: '否',
    rentDate: '租用日期', days: '租用天数', qty: '数量', addToCart: '加入购物车', added: '已加入购物车',
    bookNow: '立即预订', emptyCart: '购物车是空的', goShopping: '去逛逛', subtotal: '小计',
    delivery: '运送安装费', total: '合计', checkout: '去结算', remove: '删除',
    name: '联系人', phone: '手机号', city: '城市', address: '详细地址', notes: '备注',
    submitOrder: '提交订单', required: '请填写完整信息', orderDone: '预订成功！',
    orderDoneTip: '我们的客服会在 2 小时内联系您确认订单。', orderNo: '订单号',
    myOrders: '我的订单', noOrders: '暂无订单', language: '语言 / Language',
    contact: '联系我们', about: '关于我们',
    aboutText: '我们为生日会、学校活动和企业活动提供充气城堡、水上游戏、电子游戏的出租及布置服务。',
    search: '搜索游戏或套餐', backHome: '返回首页', pending: '待确认', currency: '¥',
  },
  en: {
    appName: 'PartyBox', slogan: 'Bounce houses · Water games · Party packages for rent',
    home: 'Home', categories: 'Categories', cart: 'Cart', me: 'Me',
    featured: 'Featured', allCats: 'All Categories', blog: 'Party Tips', viewAll: 'View all',
    perDay: '/day', size: 'Size', age: 'Age', staff: 'Staff included', yes: 'Yes', no: 'No',
    rentDate: 'Rental date', days: 'Days', qty: 'Quantity', addToCart: 'Add to cart', added: 'Added to cart',
    bookNow: 'Book now', emptyCart: 'Your cart is empty', goShopping: 'Browse games', subtotal: 'Subtotal',
    delivery: 'Delivery & setup', total: 'Total', checkout: 'Checkout', remove: 'Remove',
    name: 'Name', phone: 'Phone', city: 'City', address: 'Address', notes: 'Notes',
    submitOrder: 'Place order', required: 'Please fill in all fields', orderDone: 'Booking received!',
    orderDoneTip: 'Our team will contact you within 2 hours to confirm.', orderNo: 'Order #',
    myOrders: 'My orders', noOrders: 'No orders yet', language: 'Language / 语言',
    contact: 'Contact us', about: 'About us',
    aboutText: 'We rent and set up bounce houses, water games and arcade games for birthdays, schools and corporate events.',
    search: 'Search games or packages', backHome: 'Back to home', pending: 'Pending', currency: '¥',
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'zh');
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);
  const t = (key) => dict[lang][key] ?? key;
  // Picks the current-language field from a { zh, en } object.
  const tr = (obj) => obj[lang];
  return <I18nContext.Provider value={{ lang, setLang, t, tr }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
