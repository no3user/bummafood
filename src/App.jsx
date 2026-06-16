import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Home, Grid, FileText, User, 
  Plus, Minus, Trash2, ArrowLeft, Share2, MapPin, 
  CheckCircle, ChevronRight, Star, Clock, Info, 
  ShieldCheck, ArrowRight, Camera, X, Check, 
  Store, Edit, Settings, UploadCloud, FileCheck,
  Printer, MessageCircle, ChevronDown, ChevronUp,
  Map
} from 'lucide-react';

// --- MOCK DATA ---
const categories = [
  { id: 'all', name: 'Semua Produk', icon: '🍽️' },
  { id: 'nugget', name: 'Nugget', icon: '🍗' },
  { id: 'sosis', name: 'Sosis', icon: '🌭' },
  { id: 'dimsum', name: 'Dimsum', icon: '🥟' },
  { id: 'seafood', name: 'Seafood', icon: '🍤' },
  { id: 'kentang', name: 'Kentang', icon: '🍟' },
];

const initialProducts = [
  { id: 1, name: 'Nugget Ayam Premium', price: 28000, stock: 25, category: 'nugget', image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=400', badge: 'Terlaris', rating: 4.8, sold: 120, weight: '500 gram', desc: 'Nugget ayam premium dengan daging ayam pilihan, gurih, renyah di luar dan lembut di dalam.', composition: 'Daging ayam, tepung roti, telur, bumbu pilihan', storage: 'Simpan di freezer (-18°C)', expired: '12 bulan dari tanggal produksi', saranPenyajian: 'Goreng dalam minyak panas sedang hingga kuning kecoklatan.', showDetails: true },
  { id: 2, name: 'Sosis Sapi Premium', price: 32000, stock: 18, category: 'sosis', image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=400', badge: '', rating: 4.9, sold: 85, weight: '500 gram', desc: 'Sosis sapi dengan kandungan daging sapi tinggi, cocok untuk dibakar atau digoreng.', composition: 'Daging sapi, bumbu sosis, selongsong edible', storage: 'Simpan di freezer (-18°C)', expired: '6 bulan dari tanggal produksi', saranPenyajian: 'Panggang di teflon dengan sedikit margarin, atau goreng hingga mekar.', showDetails: true },
  { id: 3, name: 'Dimsum Ayam', price: 25000, stock: 30, category: 'dimsum', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=400', badge: '', rating: 4.7, sold: 200, weight: '250 gram', desc: 'Dimsum ayam lembut dengan tekstur juicy, sudah termasuk saus sambal.', composition: 'Daging ayam cincang, tepung tapioka, kulit pangsit', storage: 'Simpan di freezer (-18°C)', expired: '3 bulan dari tanggal produksi', saranPenyajian: 'Kukus selama 10-15 menit sebelum disajikan panas-panas.', showDetails: true },
  { id: 4, name: 'Ebi Furai', price: 35000, stock: 12, category: 'seafood', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=400', badge: 'Stok Hampir Habis', rating: 4.9, sold: 45, weight: '300 gram', desc: 'Udang utuh berbalut tepung roti yang renyah ala restoran Jepang.', composition: 'Udang, tepung terigu, tepung roti', storage: 'Simpan di freezer (-18°C)', expired: '6 bulan dari tanggal produksi', saranPenyajian: 'Goreng *deep fry* (minyak banyak) hingga renyah keemasan.', showDetails: true },
];

const mockRegisteredCustomers = [
  { id: 1, name: 'Agus Santoso', phone: '081234567890', address: 'Jl. Melati No. 5, Banyuwangi' },
  { id: 2, name: 'Siti Aminah', phone: '085678901234', address: 'Perum Gading Raya Blok B2' }
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

export default function App() {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('home');
  const [authRedirectTarget, setAuthRedirectTarget] = useState(null);
  
  // Data States
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [registeredCustomers, setRegisteredCustomers] = useState(mockRegisteredCustomers);
  
  // User States
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', address: '', password: '' });
  const [toastMsg, setToastMsg] = useState('');

  // Profile Edit States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', address: '' });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Checkout States
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('tunai');
  const [orderNote, setOrderNote] = useState('');

  // Admin / Store Settings State
  const [storeInfo, setStoreInfo] = useState({ address: 'Jl. Ahmad Yani No. 10, Banyuwangi, Jawa Timur', mapsLink: 'https://maps.google.com/', waNumber: '6281234567890', deliveryFee: 10000 });
  const [bankAccounts, setBankAccounts] = useState([{ id: 1, bank: 'BCA', accNumber: '8234567890', owner: 'Bumma Frozen Food' }]);

  // Admin Dashboard States
  const [adminTab, setAdminTab] = useState('ringkasan');
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({ id: null, name: '', price: '', stock: '', category: 'nugget', image: '', desc: '', weight: '500 gram', composition: '', storage: 'Simpan di freezer (-18°C)', expired: '12 bulan', saranPenyajian: '', showDetails: true });
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [editingBank, setEditingBank] = useState(null);
  const [bankForm, setBankForm] = useState({ bank: '', accNumber: '', owner: '' });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try { document.execCommand('copy'); showToast('Berhasil menyalin: ' + text); } 
    catch (err) { showToast('Gagal menyalin teks'); }
    document.body.removeChild(textArea);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (loginForm.phone === 'admin' && loginForm.password === 'admin') {
        setCurrentUser({ name: 'Owner Bumma', phone: 'Admin', role: 'admin' });
        showToast('Berhasil masuk sebagai Admin');
        setCurrentScreen('main'); setActiveTab('admin'); setAdminTab('ringkasan');
        return;
      }
      if (!loginForm.phone || !loginForm.password) { showToast('Mohon lengkapi nomor WA dan Password'); return; }
      
      const existingUser = registeredCustomers.find(c => c.phone === loginForm.phone);
      const userToLogin = existingUser ? { ...existingUser, role: 'user' } : { name: 'Pelanggan Setia', phone: loginForm.phone, address: 'Alamat lengkap...', role: 'user' };
      
      setCurrentUser(userToLogin);
      showToast('Berhasil masuk!');
    } else {
      if (!registerForm.name || !registerForm.phone) { showToast('Mohon lengkapi data wajib (Nama & No WA)'); return; }
      const newCust = { name: registerForm.name, phone: registerForm.phone, address: registerForm.address || 'Alamat belum diisi', role: 'user' };
      setCurrentUser(newCust);
      setRegisteredCustomers([...registeredCustomers, { ...newCust, id: Date.now() }]);
      showToast('Akun berhasil dibuat!');
    }

    if (authRedirectTarget) {
      setCurrentScreen(authRedirectTarget);
      setAuthRedirectTarget(null);
    } else {
      setCurrentScreen('main');
      setActiveTab('home');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, ...profileForm };
    setCurrentUser(updatedUser);
    
    // Sinkronisasi data ke mock database
    setRegisteredCustomers(prev => prev.map(c => 
      c.phone === currentUser.phone ? { ...c, ...profileForm } : c
    ));
    
    setIsEditingProfile(false);
    showToast('Profil berhasil diperbarui!');
  };

  const addToCart = (product, qty = 1, showNotification = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      return [...prev, { ...product, quantity: qty }];
    });
    if (showNotification) showToast(`${product.name} ditambahkan!`);
  };

  const updateCartQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? (parseInt(storeInfo.deliveryFee) || 0) : 0;
  const grandTotal = cartTotal > 0 ? (cartTotal + deliveryFee) : 0;

  const handleCheckoutClick = () => {
    if (!currentUser) {
      showToast('Silakan daftar/masuk untuk melanjutkan pesanan.');
      setAuthRedirectTarget('checkout'); 
      setAuthMode('register');
      setCurrentScreen('auth');
    } else {
      setCurrentScreen('checkout');
    }
  };

  const processOrder = () => {
    const invoiceId = `BFF-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random() * 1000)}`;
    const newOrder = {
      id: invoiceId,
      date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' }),
      customerName: currentUser?.name || 'Tamu',
      customerPhone: currentUser?.phone || '',
      items: [...cart],
      total: grandTotal,
      paymentMethod: paymentMethod,
      deliveryMethod: deliveryMethod,
      note: orderNote,
      proofUploaded: null,
      status: paymentMethod === 'tunai' ? 'Diproses' : 'Menunggu Pembayaran'
    };
    setOrderHistory(prev => [newOrder, ...prev]);
    setCart([]); setOrderNote('');
    setCurrentScreen('success'); 
  };

  const handleOrderProofUpload = (orderId, e) => {
    if(e.target.files && e.target.files[0]) {
      setOrderHistory(prev => prev.map(o => o.id === orderId ? {...o, proofUploaded: e.target.files[0].name, status: 'Menunggu Verifikasi'} : o));
      showToast("Bukti berhasil diunggah! Klik Konfirmasi via WA.");
    }
  };

  const confirmViaWA = (order) => {
    let message = `Assalamu'alaikum Admin Bumma Frozen Food.\nSaya ingin mengkonfirmasi pesanan saya:\n\n*Invoice:* ${order.id}\n*Nama:* ${order.customerName}\n*Layanan:* ${order.deliveryMethod === 'delivery' ? 'Delivery Lokal' : 'Ambil di Toko'}\n*Metode:* ${order.paymentMethod === 'tunai' ? 'Tunai (Cash)' : 'Transfer Bank'}\n*Total:* ${formatRupiah(order.total)}\n\n*Daftar Belanja:*\n`;
    order.items.forEach(item => { message += `- ${item.name} (${item.quantity}x)\n`; });
    if (order.note) message += `\n*Catatan:* ${order.note}`;
    if (order.proofUploaded) message += `\n\n_(Bukti transfer sudah saya upload via web)_`;
    message += `\n\nMohon bantu verifikasi pesanan saya. Terima kasih.`;
    window.open(`https://wa.me/${storeInfo.waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePrintStruk = (order) => {
    const printContent = `
      <div style="width: 58mm; font-family: monospace; font-size: 12px; margin: 0 auto; color: #000;">
        <div style="text-align:center; margin-bottom: 10px;">
          <h2 style="margin:0; font-size: 16px;">BUMMA FROZEN FOOD</h2>
          <p style="margin:2px 0;">Lauk Praktis temannya Nasi</p>
        </div>
        <div style="border-bottom: 1px dashed #000; margin-bottom: 10px;"></div>
        <p style="margin:2px 0;">Inv : ${order.id}</p>
        <p style="margin:2px 0;">Tgl : ${order.date}</p>
        <p style="margin:2px 0;">Plg : ${order.customerName}</p>
        <div style="border-bottom: 1px dashed #000; margin-top: 10px; margin-bottom: 10px;"></div>
        ${order.items.map(i => `
          <div style="margin-bottom: 5px;">
            <div style="font-weight: bold;">${i.name}</div>
            <div style="display:flex; justify-content:space-between;">
              <span>${i.quantity}x @${i.price}</span>
              <span>${i.quantity * i.price}</span>
            </div>
          </div>
        `).join('')}
        <div style="border-bottom: 1px dashed #000; margin-top: 10px; margin-bottom: 10px;"></div>
        <div style="display:flex; justify-content:space-between; font-weight: bold; font-size: 14px;">
          <span>TOTAL</span>
          <span>${order.total}</span>
        </div>
        <p style="margin:5px 0;">Metode : ${order.paymentMethod.toUpperCase()}</p>
        <div style="border-bottom: 1px dashed #000; margin-top: 10px; margin-bottom: 10px;"></div>
        <p style="text-align:center; font-weight:bold;">*** TERIMA KASIH ***</p>
      </div>
    `;
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    printWindow.document.write('<html><head><title>Struk Pesanan</title></head><body style="margin:0; padding:10px;">' + printContent + '</body></html>');
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const handleShareStrukWA = (order) => {
    let targetPhone = order.customerPhone || "";
    if (targetPhone.startsWith('0')) targetPhone = '62' + targetPhone.slice(1);
    const msg = `Halo *${order.customerName}* 👋,\n\nPembayaran untuk pesanan *${order.id}* telah kami verifikasi dan *BERHASIL* diterima.\nPesanan Anda sedang kami proses dan akan segera disiapkan! 🎉\n\n*Detail Pesanan:*\nTotal: ${formatRupiah(order.total)}\nLayanan: ${order.deliveryMethod === 'delivery' ? 'Delivery Lokal' : 'Ambil di Toko'}\n\nTerima kasih telah berbelanja di Bumma Frozen Food.\n_Lauk Praktis temannya nasi_`;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderHistory(prev => prev.map(o => o.id === order.id ? {...o, status: 'Diproses'} : o));
  };

  const getCustomerStats = (phone) => {
    const orders = orderHistory.filter(o => o.customerPhone === phone && o.status !== 'Dibatalkan');
    return {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
      history: orders
    };
  };

  const renderToast = () => {
    if (!toastMsg) return null;
    return (
      <div className="fixed top-6 left-0 right-0 w-full max-w-md mx-auto z-50 flex justify-center px-4 pointer-events-none">
        <div className="animate-fade-in-down bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between text-sm font-medium w-full max-w-sm pointer-events-auto">
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /><span>{toastMsg}</span></div>
          <button onClick={() => setToastMsg('')} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    const totalRevenue = orderHistory.filter(o => o.status !== 'Dibatalkan').reduce((sum, order) => sum + order.total, 0);

    const handleSaveProduct = (e) => {
      e.preventDefault();
      if (productForm.id) { setProducts(products.map(p => p.id === productForm.id ? productForm : p)); showToast('Produk diperbarui!'); } 
      else { setProducts([{ ...productForm, id: Date.now() }, ...products]); showToast('Produk baru ditambahkan!'); }
      setShowProductForm(false);
    };

    const handleSaveBank = (e) => {
      e.preventDefault();
      if (editingBank === 'new') {
        setBankAccounts([...bankAccounts, { ...bankForm, id: Date.now() }]);
        showToast('Rekening berhasil ditambahkan!');
      } else {
        setBankAccounts(bankAccounts.map(b => b.id === editingBank ? { ...bankForm, id: b.id } : b));
        showToast('Rekening berhasil diperbarui!');
      }
      setEditingBank(null);
      setBankForm({ bank: '', accNumber: '', owner: '' });
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Admin Header */}
        <div className="bg-white pt-6 pb-4 px-4 sticky top-0 z-20 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-white">
               <img src="Logo_Bumma-removebg-preview.jpg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-lg text-green-800">Owner Panel</h1>
          </div>
          <button onClick={() => { setCurrentUser(null); setCurrentScreen('splash'); }} className="text-xs text-red-500 font-bold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Logout</button>
        </div>
        
        <div className="p-4 space-y-4">
          {adminTab === 'ringkasan' && (
            <div className="space-y-4 animate-fade-in-down">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2"><CheckCircle className="w-5 h-5"/></div>
                   <p className="text-[11px] text-gray-500 font-semibold mb-1">Pendapatan Kotor</p>
                   <p className="text-sm font-bold text-gray-800">{formatRupiah(totalRevenue)}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2"><ShoppingCart className="w-5 h-5"/></div>
                   <p className="text-[11px] text-gray-500 font-semibold mb-1">Total Pesanan</p>
                   <p className="text-xl font-bold text-gray-800">{orderHistory.length}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                 <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2"><User className="w-4 h-4 text-green-600"/> Data Pelanggan Terdaftar</h2>
                 <div className="space-y-3">
                   {registeredCustomers.map((cust, i) => {
                     const stats = getCustomerStats(cust.phone);
                     const isExpanded = expandedCustomer === cust.phone;
                     return (
                       <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                         <div 
                           onClick={() => setExpandedCustomer(isExpanded ? null : cust.phone)}
                           className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                         >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">{cust.name.charAt(0)}</div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 leading-tight">{cust.name}</p>
                                <p className="text-[10px] text-gray-500">{cust.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-right">
                              <div>
                                <p className="text-xs font-bold text-green-600">{stats.totalOrders} Trx</p>
                                <p className="text-[10px] text-gray-500">{formatRupiah(stats.totalSpent)}</p>
                              </div>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
                            </div>
                         </div>
                         {isExpanded && (
                           <div className="p-3 bg-white border-t border-gray-100 text-xs">
                             <p className="font-semibold text-gray-600 mb-2">Riwayat Pesanan ({stats.history.length})</p>
                             {stats.history.length === 0 ? (
                               <p className="text-gray-400 italic">Belum ada transaksi berhasil.</p>
                             ) : (
                               stats.history.map(hist => (
                                 <div key={hist.id} className="flex justify-between items-center mb-1.5 pb-1.5 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                                   <div><span className="text-gray-800 font-medium block">{hist.id}</span><span className="text-[10px] text-gray-400">{hist.date}</span></div>
                                   <div className="text-right"><span className="text-green-600 font-bold block">{formatRupiah(hist.total)}</span><span className="text-[9px] bg-gray-100 px-1 rounded">{hist.status}</span></div>
                                 </div>
                               ))
                             )}
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
              </div>
            </div>
          )}

          {adminTab === 'produk' && (
             <div className="animate-fade-in-down">
                {!showProductForm ? (
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                      <h2 className="font-bold text-gray-800">Katalog Produk</h2>
                      <button onClick={() => { setProductForm({ id: null, name: '', price: '', stock: '', category: 'nugget', image: '', desc: '', weight: '500 gram', composition: '', storage: 'Simpan di freezer (-18°C)', expired: '12 bulan', saranPenyajian: '', showDetails: true }); setShowProductForm(true); }} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"><Plus className="w-3 h-3"/> Tambah</button>
                    </div>
                    <div className="space-y-3">
                      {products.map(p => (
                        <div key={p.id} className="flex justify-between items-center border border-gray-100 p-2 rounded-xl bg-gray-50">
                          <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200"><img src={p.image} className="w-full h-full object-cover" alt={p.name}/></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 leading-tight">{p.name}</p>
                              <p className="text-[10px] font-bold text-green-600">{formatRupiah(p.price)} <span className="text-gray-400 font-normal">• Stok: {p.stock}</span></p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-2 bg-white border border-blue-100 text-blue-600 rounded-lg hover:bg-blue-50" onClick={() => { setProductForm(p); setShowProductForm(true); }}><Edit className="w-4 h-4"/></button>
                            <button className="p-2 bg-white border border-red-100 text-red-600 rounded-lg hover:bg-red-50" onClick={() => { setProducts(products.filter(x => x.id !== p.id)); showToast('Produk dihapus!'); }}><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProduct} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                      <h2 className="font-bold text-gray-800">{productForm.id ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                      <button type="button" onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">Foto Produk (WebP/JPG, Rasio 1:1, Max 150KB)</label>
                        <div className="flex gap-3 items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {productForm.image ? <img src={productForm.image} className="w-full h-full object-cover" alt="Preview"/> : <Camera className="w-6 h-6 text-gray-400"/>}
                          </div>
                          <div className="flex-1">
                            <input type="file" id="product-img" className="hidden" accept="image/webp, image/jpeg" onChange={(e) => { if(e.target.files[0]) setProductForm({...productForm, image: URL.createObjectURL(e.target.files[0])}) }} />
                            <label htmlFor="product-img" className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-green-200 inline-block hover:bg-green-100">Upload File</label>
                          </div>
                        </div>
                      </div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Nama Produk</label><input required type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                      <div className="flex gap-2">
                        <div className="flex-1"><label className="text-xs font-semibold text-gray-600 block mb-1">Harga (Rp)</label><input required type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                        <div className="w-24"><label className="text-xs font-semibold text-gray-600 block mb-1">Stok</label><input required type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1"><label className="text-xs font-semibold text-gray-600 block mb-1">Berat</label><input type="text" value={productForm.weight} onChange={e => setProductForm({...productForm, weight: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                        <div className="flex-1"><label className="text-xs font-semibold text-gray-600 block mb-1">Penyimpanan</label><input type="text" value={productForm.storage} onChange={e => setProductForm({...productForm, storage: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                      </div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Komposisi</label><input type="text" value={productForm.composition} onChange={e => setProductForm({...productForm, composition: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none"/></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Deskripsi Produk</label><textarea value={productForm.desc} onChange={e => setProductForm({...productForm, desc: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none h-16 resize-none"/></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Saran Penyajian</label><textarea value={productForm.saranPenyajian} onChange={e => setProductForm({...productForm, saranPenyajian: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none h-16 resize-none"/></div>
                      
                      <div className="flex items-center gap-2 mt-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                         <input type="checkbox" id="showDetails" checked={productForm.showDetails} onChange={e => setProductForm({...productForm, showDetails: e.target.checked})} className="w-4 h-4 text-green-600 rounded border-gray-300"/>
                         <label htmlFor="showDetails" className="text-xs font-semibold text-gray-700 cursor-pointer">Tampilkan Detail (Deskripsi, Komposisi) di Halaman Produk</label>
                      </div>

                      <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold mt-2 hover:bg-green-700">Simpan Produk</button>
                    </div>
                  </form>
                )}
             </div>
          )}

          {adminTab === 'pesanan' && (
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-down">
               <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2"><FileText className="w-4 h-4 text-green-600"/> Pesanan Masuk</h2>
               <div className="space-y-4">
                 {orderHistory.length === 0 ? (
                   <p className="text-gray-400 text-sm text-center py-4">Belum ada pesanan masuk.</p>
                 ) : (
                   orderHistory.map(order => (
                     <div key={order.id} className="border border-gray-200 rounded-xl p-3 bg-gray-50 shadow-sm">
                       <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                         <div><span className="text-[10px] text-gray-500 block">{order.date}</span><span className="text-xs font-bold text-gray-800">{order.id}</span></div>
                         <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">{order.status}</span>
                       </div>
                       <p className="text-sm font-bold text-gray-800 mb-1">{order.customerName}</p>
                       <p className="text-xs text-gray-600 mb-2">Total: <span className="text-green-600 font-bold">{formatRupiah(order.total)}</span> • {order.paymentMethod === 'tunai' ? 'Tunai' : 'Transfer'}</p>
                       
                       <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                         <button onClick={() => handlePrintStruk(order)} className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-gray-700 transition-colors">
                           <Printer className="w-3.5 h-3.5" /> Cetak Struk
                         </button>
                         <button onClick={() => handleShareStrukWA(order)} className="flex-1 bg-[#25D366] text-white py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#20b858] transition-colors">
                           <MessageCircle className="w-3.5 h-3.5" /> Info via WA
                         </button>
                       </div>
                     </div>
                   ))
                 )}
               </div>
            </div>
          )}

          {adminTab === 'pengaturan' && (
            <div className="space-y-4 animate-fade-in-down">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                 <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">Pengaturan Toko</h2>
                 <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-semibold">Nomor WhatsApp Admin (Awali dgn 62)</label>
                      <input type="text" value={storeInfo.waNumber} onChange={(e) => setStoreInfo({...storeInfo, waNumber: e.target.value})} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm mt-1 outline-none focus:border-green-500"/>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-semibold">Biaya Ongkir Default Lokal (Rp)</label>
                      <input type="number" value={storeInfo.deliveryFee} onChange={(e) => setStoreInfo({...storeInfo, deliveryFee: e.target.value})} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm mt-1 outline-none focus:border-green-500"/>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-semibold">Alamat Lengkap Toko</label>
                      <textarea value={storeInfo.address} onChange={(e) => setStoreInfo({...storeInfo, address: e.target.value})} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm mt-1 outline-none h-20 resize-none focus:border-green-500"/>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-semibold flex items-center gap-1"><Map className="w-3 h-3"/> Link Google Maps (Opsional)</label>
                      <input type="text" value={storeInfo.mapsLink} onChange={(e) => setStoreInfo({...storeInfo, mapsLink: e.target.value})} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm mt-1 outline-none focus:border-green-500"/>
                    </div>
                    <button onClick={() => showToast('Pengaturan disimpan!')} className="w-full bg-gray-800 text-white py-2.5 rounded-lg text-sm font-bold mt-2 hover:bg-gray-900 transition-colors">Simpan Perubahan</button>
                 </div>
               </div>
               
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-3 border-b pb-2">
                   <h2 className="font-bold text-gray-800">Rekening Transfer</h2>
                   {!editingBank && <button onClick={() => {setEditingBank('new'); setBankForm({bank:'', accNumber:'', owner:''});}} className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded hover:bg-green-100">Tambah Baru</button>}
                 </div>

                 {editingBank ? (
                    <form onSubmit={handleSaveBank} className="bg-gray-50 border border-gray-200 p-3 rounded-xl mb-3 space-y-2 animate-fade-in-down">
                      <p className="text-xs font-bold text-gray-700">{editingBank === 'new' ? 'Tambah Rekening' : 'Edit Rekening'}</p>
                      <input required type="text" placeholder="Nama Bank (misal: BCA)" value={bankForm.bank} onChange={e=>setBankForm({...bankForm, bank: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-green-500"/>
                      <input required type="text" placeholder="Nomor Rekening" value={bankForm.accNumber} onChange={e=>setBankForm({...bankForm, accNumber: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-green-500"/>
                      <input required type="text" placeholder="Atas Nama" value={bankForm.owner} onChange={e=>setBankForm({...bankForm, owner: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-green-500"/>
                      <div className="flex gap-2 pt-1">
                        <button type="submit" className="flex-1 bg-green-600 text-white text-xs py-2 font-bold rounded-lg hover:bg-green-700 transition-colors">Simpan</button>
                        <button type="button" onClick={() => setEditingBank(null)} className="flex-1 bg-gray-200 text-gray-700 text-xs py-2 font-bold rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                      </div>
                    </form>
                 ) : (
                    <div className="space-y-2">
                      {bankAccounts.map(bank => (
                        <div key={bank.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl">
                          <div><p className="text-xs font-bold text-gray-800">{bank.bank} - {bank.accNumber}</p><p className="text-[10px] text-gray-500">a.n {bank.owner}</p></div>
                          <div className="flex gap-1">
                            <button onClick={() => {setBankForm(bank); setEditingBank(bank.id);}} className="text-blue-500 p-1.5 bg-blue-50 rounded hover:bg-blue-100"><Edit className="w-4 h-4"/></button>
                            <button onClick={() => setBankAccounts(bankAccounts.filter(b => b.id !== bank.id))} className="text-red-500 p-1.5 bg-red-50 rounded hover:bg-red-100"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSplashScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-green-200 rounded-b-[100%] opacity-40 -translate-y-20"></div>
      <div className="absolute bottom-10 right-[-20%] w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
      <div className="absolute top-20 left-[-10%] w-40 h-40 bg-green-300 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>

      <div className="z-10 flex flex-col items-center text-center mt-2 w-full">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-70"></div>
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl p-1 overflow-hidden border-4 border-green-400 relative z-10">
            <img src="Logo_Bumma-removebg-preview.jpg" alt="Logo Bumma" className="w-full h-full object-contain rounded-full bg-white"/>
          </div>
          <div className="absolute -right-4 top-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg rotate-12 z-20 border-2 border-white">Lebih Praktis</div>
          <div className="absolute -left-4 bottom-2 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-2 py-1 rounded-full shadow-lg -rotate-6 z-20 border-2 border-white">Siap Saji</div>
        </div>

        <h1 className="text-3xl font-extrabold text-green-800 mb-1 drop-shadow-sm">Bumma</h1>
        <h2 className="text-xl font-bold text-green-600 mb-4 drop-shadow-sm">Frozen Food</h2>
        
        <div className="bg-green-700 text-white px-5 py-1.5 rounded-full text-[10px] font-semibold mb-4 shadow-md border border-green-500/50">
          Halal • Berkualitas • Praktis
        </div>

        {/* Gambar Makanan Tambahan */}
        <div className="w-full max-w-[240px] h-28 bg-white p-1 rounded-[2rem] shadow-lg mb-4 relative z-10 rotate-1 border border-gray-100">
          <img src="https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=400" alt="Produk Bumma" className="w-full h-full object-cover rounded-[1.8rem]" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6 leading-snug max-w-xs">
          Lauk Praktis<br/><span className="text-green-600">temannya nasi</span>
        </h3>

        <div className="w-full space-y-3 px-2">
          <button onClick={() => { setAuthMode('login'); setCurrentScreen('auth'); }} className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:shadow-green-500/30 transition-all active:scale-95 text-sm">Masuk Akun</button>
          <button onClick={() => { setAuthMode('register'); setCurrentScreen('auth'); }} className="w-full bg-white text-green-700 py-3 rounded-2xl font-bold border-2 border-green-600 shadow-sm hover:bg-green-50 transition-all active:scale-95 text-sm">Daftar Baru</button>
          <button onClick={() => { setCurrentScreen('main'); setActiveTab('home'); }} className="w-full text-green-700 py-2 font-semibold hover:underline mt-1 active:scale-95 transition-all text-xs">Mulai Lanjut Sebagai Tamu</button>
        </div>
      </div>
    </div>
  );

  const renderAuthScreen = () => (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-12 pb-6 relative overflow-y-auto">
      <button onClick={() => setCurrentScreen('splash')} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-6"><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{authMode === 'login' ? 'Selamat Datang!' : 'Buat Akun Baru'}</h1>
      <p className="text-gray-500 mb-8 text-sm">{authMode === 'login' ? 'Masuk untuk mengelola pesanan. (Owner: admin/admin)' : 'Daftar sekarang dan nikmati kemudahan transaksi.'}</p>
      <form onSubmit={handleAuth} className="space-y-4 flex-grow">
        {authMode === 'register' && <div><label className="text-sm font-semibold text-gray-700 mb-1 block">Nama Lengkap</label><input type="text" value={registerForm.name} onChange={e => setRegisterForm({...registerForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-sm transition-all"/></div>}
        <div><label className="text-sm font-semibold text-gray-700 mb-1 block">Nomor WhatsApp</label><input type="text" value={authMode === 'login' ? loginForm.phone : registerForm.phone} onChange={e => authMode === 'login' ? setLoginForm({...loginForm, phone: e.target.value}) : setRegisterForm({...registerForm, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-sm transition-all" placeholder="Contoh: 08123... atau 'admin'"/></div>
        <div><label className="text-sm font-semibold text-gray-700 mb-1 block">Password</label><input type="password" value={authMode === 'login' ? loginForm.password : registerForm.password} onChange={e => authMode === 'login' ? setLoginForm({...loginForm, password: e.target.value}) : setRegisterForm({...registerForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-sm transition-all"/></div>
        {authMode === 'register' && <div><label className="text-sm font-semibold text-gray-700 mb-1 block">Alamat Pengiriman Default (Opsional)</label><textarea value={registerForm.address} onChange={e => setRegisterForm({...registerForm, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-sm h-20 resize-none transition-all"/></div>}
        <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-green-700 mt-6 active:scale-95 transition-all">{authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}</button>
      </form>
    </div>
  );

  const renderHome = () => {
    // Filter Products Logic
    const filteredProducts = products.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header Compact */}
        <div className="bg-green-600 px-4 pt-6 pb-6 rounded-b-3xl shadow-sm text-white relative z-20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-bl-full mix-blend-overlay"></div>
          
          <div className="flex justify-between items-center relative z-10 mb-4">
            <div>
              <p className="text-[11px] text-green-100 font-medium mb-0.5">
                {currentUser && currentUser.role !== 'admin' ? `Halo, ${currentUser.name.split(' ')[0]} 👋` : 'Halo, Tamu 👋'}
              </p>
              <h1 className="text-lg font-bold leading-tight drop-shadow-sm">Mau lauk praktis hari ini?</h1>
            </div>
            
            {currentUser && currentUser.role !== 'admin' ? (
              <div onClick={() => setActiveTab('profile')} className="w-10 h-10 bg-white text-green-600 rounded-full shadow-sm border-2 border-green-300 flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-green-50 transition-colors">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div onClick={() => { if(!currentUser) { setAuthMode('login'); setCurrentScreen('auth'); } }} className="w-10 h-10 bg-white rounded-full p-0.5 shadow-sm border border-green-300 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity bg-white">
                <img src="Logo_Bumma-removebg-preview.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
            )}
          </div>

          {/* Compact Search Bar */}
          <div className="relative z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk (Misal: Nugget)..." 
              className="w-full bg-white text-gray-800 pl-9 pr-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-green-400 text-xs shadow-sm font-medium placeholder:font-normal"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-gray-100 p-1 rounded-full"><X className="w-3 h-3" /></button>
            )}
          </div>
        </div>

        {/* Floating cart icon */}
        {totalItems > 0 && (
           <div className="fixed bottom-20 left-0 right-0 w-full max-w-md mx-auto z-40 pointer-events-none flex justify-end px-4">
             <button onClick={() => setCurrentScreen('cart')} className="relative w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-transform hover:scale-105 active:scale-95 pointer-events-auto">
               <ShoppingCart className="w-5 h-5" />
               <span className="absolute top-0 right-0 bg-white text-orange-600 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-orange-500">{totalItems}</span>
             </button>
           </div>
        )}

        {/* Category Filters (Clickable) */}
        <div className="flex overflow-x-auto px-4 pt-5 pb-3 gap-3 hide-scrollbar">
          {categories.map((cat, i) => (
            <div key={i} onClick={() => setActiveCategory(cat.id)} className="flex flex-col items-center gap-1.5 min-w-[50px] cursor-pointer group">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${activeCategory === cat.id ? 'bg-green-500 shadow-md ring-2 ring-green-200' : 'bg-white border border-gray-200 group-hover:border-green-300 group-hover:bg-green-50'}`}>
                 <span className="text-xl">{cat.icon}</span>
              </div>
              <span className={`text-[9px] text-center font-medium transition-colors ${activeCategory === cat.id ? 'text-green-700 font-bold' : 'text-gray-500'}`}>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in-down">
            <Search className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-gray-800 font-bold text-sm mb-1">Produk tidak ditemukan</h3>
            <p className="text-xs text-gray-500">Coba ubah pencarian atau filter kategori Anda.</p>
          </div>
        ) : (
          <div className="px-4 py-2 grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col animate-fade-in-down">
                <div className="h-28 w-full bg-gray-100 relative cursor-pointer group" onClick={() => { setSelectedProduct(product); setCurrentScreen('detail'); }}>
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={product.name}/>
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm ${product.badge === 'Stok Hampir Habis' ? 'bg-red-500' : 'bg-green-500'}`}>{product.badge}</span>
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-grow relative">
                  <h3 className="font-semibold text-gray-800 text-[11px] mb-1 line-clamp-2 leading-snug cursor-pointer pr-6" onClick={() => { setSelectedProduct(product); setCurrentScreen('detail'); }}>{product.name}</h3>
                  <div className="text-green-600 font-bold text-xs mb-2">{formatRupiah(product.price)}</div>
                  
                  {/* Plus Icon Button mapped correctly right side */}
                  <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-green-50 text-green-700 rounded-full flex items-center justify-center border border-green-200 hover:bg-green-100 active:scale-95 transition-all shadow-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="min-h-screen bg-gray-50 pb-24 relative z-50">
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
          <button onClick={() => setCurrentScreen('main')} className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-gray-800 hover:bg-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button onClick={() => handleCopy(window.location.href)} className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-gray-800 hover:bg-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentScreen('cart')} className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-gray-800 hover:bg-white relative transition-colors">
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-white">{totalItems}</span>}
            </button>
          </div>
        </div>

        <div className="w-full h-64 bg-gray-200">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
        </div>

        <div className="bg-white px-4 py-5 -mt-6 rounded-t-3xl relative z-10 shadow-sm mb-2">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-lg font-bold text-gray-800 max-w-[70%] leading-tight">{selectedProduct.name}</h1>
            <span className="text-lg font-bold text-green-600">{formatRupiah(selectedProduct.price)}</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-800">{selectedProduct.rating}</span>
              <span>({selectedProduct.sold})</span>
            </div>
            <div>Stok: <span className="font-semibold text-gray-800">{selectedProduct.stock}</span></div>
          </div>

          <div className="flex gap-2 mb-2">
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-semibold rounded-md border border-green-100 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Halal</span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-md border border-blue-100 flex items-center gap-1">❄️ Frozen</span>
          </div>
        </div>

        {/* Tampilan Kondisional Berdasarkan showDetails Checkbox dari Admin */}
        {selectedProduct.showDetails !== false && (
          <>
            <div className="bg-white p-4 mb-2 shadow-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 flex justify-center"><CheckCircle className="w-4 h-4 text-gray-400" /></div>
                  <div><p className="text-[10px] text-gray-500 font-medium">Berat</p><p className="text-xs font-semibold text-gray-800">{selectedProduct.weight}</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 flex justify-center"><Info className="w-4 h-4 text-gray-400" /></div>
                  <div><p className="text-[10px] text-gray-500 font-medium">Komposisi</p><p className="text-xs font-semibold text-gray-800">{selectedProduct.composition}</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 flex justify-center"><ShieldCheck className="w-4 h-4 text-gray-400" /></div>
                  <div><p className="text-[10px] text-gray-500 font-medium">Penyimpanan</p><p className="text-xs font-semibold text-gray-800">{selectedProduct.storage}</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 mb-4 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-2">Deskripsi</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{selectedProduct.desc}</p>
              
              {selectedProduct.saranPenyajian && (
                <>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">Saran Penyajian</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.saranPenyajian}</p>
                </>
              )}
            </div>
          </>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 px-4 flex gap-3 max-w-md mx-auto z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button onClick={() => { addToCart(selectedProduct, 1, false); setCurrentScreen('checkout'); }} className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border-2 border-green-600 text-green-700 hover:bg-green-50 active:scale-95 transition-all">
            Beli Sekarang
          </button>
          <button onClick={() => addToCart(selectedProduct)} className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all shadow-md">
            + Keranjang
          </button>
        </div>
      </div>
    );
  };

  const renderProfileTab = () => {
    if (!currentUser) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-6 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 border border-gray-200">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Belum Masuk Akun</h2>
          <p className="text-xs text-gray-500 mb-6">Silakan daftar atau masuk untuk melengkapi profil dan mempercepat proses checkout Anda.</p>
          <div className="w-full space-y-3 max-w-[250px]">
            <button onClick={() => {setAuthMode('login'); setCurrentScreen('auth');}} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-green-700 active:scale-95 transition-all">Masuk Akun</button>
            <button onClick={() => {setAuthMode('register'); setCurrentScreen('auth');}} className="w-full bg-white border-2 border-green-600 text-green-700 py-3 rounded-xl font-bold text-sm hover:bg-green-50 active:scale-95 transition-all">Daftar Baru</button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-green-600 pt-8 pb-16 px-4 text-center text-white rounded-b-3xl relative">
           <h1 className="font-bold text-lg">Profil Akun</h1>
           {!isEditingProfile && (
             <button onClick={() => { setProfileForm({ name: currentUser.name, phone: currentUser.phone, address: currentUser.address }); setIsEditingProfile(true); }} className="absolute top-8 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
               <Edit className="w-4 h-4" />
             </button>
           )}
        </div>
        <div className="px-4 -mt-10">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
             {isEditingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4 animate-fade-in-down">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Nama Lengkap</label>
                    <input type="text" required value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Nomor HP/WA</label>
                    <input type="text" required value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Alamat Pengiriman</label>
                    <textarea required value={profileForm.address} onChange={e => setProfileForm({...profileForm, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-500 h-20 resize-none transition-colors"/>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-green-700 active:scale-95 transition-all">Simpan Profil</button>
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all">Batal</button>
                  </div>
                </form>
             ) : (
                <div className="flex flex-col items-center text-center animate-fade-in-down">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm mb-3 relative">
                     {currentUser.name.charAt(0).toUpperCase()}
                     <button onClick={() => { setProfileForm({ name: currentUser.name, phone: currentUser.phone, address: currentUser.address }); setIsEditingProfile(true); }} className="absolute bottom-0 right-0 bg-white border border-gray-200 p-1.5 rounded-full shadow-sm text-gray-600 hover:text-green-600 transition-colors">
                       <Edit className="w-3 h-3" />
                     </button>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{currentUser.name}</h2>
                  <p className="text-xs text-gray-500 mb-4">{currentUser.phone}</p>
                  
                  <div className="w-full text-left bg-gray-50 p-3.5 rounded-xl border border-gray-100 mb-5 flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold mb-1 uppercase tracking-wide">Alamat Pengiriman Default</p>
                      <p className="text-xs text-gray-800 font-medium leading-relaxed">{currentUser.address || 'Belum ada alamat'}</p>
                    </div>
                  </div>

                  <button onClick={() => {setCurrentUser(null); setCurrentScreen('splash'); setActiveTab('home');}} className="w-full py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-sm shadow-sm hover:bg-red-100 active:scale-95 transition-all">
                    Keluar Akun
                  </button>
                </div>
             )}
           </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    // Tampilan Spesifik Guest
    if (!currentUser) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-6 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 border border-gray-200">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Riwayat Pesanan Kosong</h2>
          <p className="text-xs text-gray-500 mb-6">Anda masuk sebagai Tamu. Silakan masuk akun untuk melihat riwayat pesanan yang Anda buat.</p>
          <div className="w-full space-y-3 max-w-[250px]">
            <button onClick={() => {setAuthMode('login'); setCurrentScreen('auth');}} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-green-700 active:scale-95 transition-all">Masuk Akun</button>
          </div>
        </div>
      );
    }

    const userOrders = orderHistory.filter(o => o.customerPhone === currentUser.phone);

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white pt-6 pb-4 px-4 sticky top-0 z-20 shadow-sm">
          <h1 className="font-bold text-lg text-gray-800">Pesanan Saya</h1>
        </div>
        <div className="p-4 space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500">Belum ada transaksi berhasil.</p>
            </div>
          ) : (
            userOrders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
                  <div><p className="text-xs text-gray-500">{order.date}</p><p className="font-bold text-gray-800 text-sm">{order.id}</p></div>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-[10px] font-bold">{order.status}</span>
                </div>
                
                <p className="font-bold text-green-600 text-lg mb-2">{formatRupiah(order.total)}</p>

                {order.paymentMethod === 'transfer' && !order.proofUploaded && (
                  <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-xl">
                    <p className="text-xs text-blue-800 mb-2 font-medium"><Info className="w-3 h-3 inline mr-1"/>Penting: Segera upload bukti transfer agar pesanan diproses.</p>
                    <input type="file" id={`upload-${order.id}`} className="hidden" onChange={(e) => handleOrderProofUpload(order.id, e)} accept="image/*" />
                    <label htmlFor={`upload-${order.id}`} className="flex items-center justify-center gap-2 w-full mt-2 py-2 bg-white border border-blue-200 rounded-lg text-xs font-bold cursor-pointer text-blue-600 shadow-sm active:scale-95 transition-all">
                      <UploadCloud className="w-4 h-4" /> Upload Bukti Transfer
                    </label>
                  </div>
                )}

                {order.proofUploaded && (
                  <div className="mb-4 flex items-center gap-2 text-xs text-green-700 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-100">
                    <FileCheck className="w-4 h-4"/> Bukti terlampir ({order.proofUploaded})
                  </div>
                )}

                <button onClick={() => confirmViaWA(order)} className="w-full bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold shadow-md flex justify-center items-center gap-2 hover:bg-[#20b858] active:scale-95 transition-all">
                  <MessageCircle className="w-5 h-5"/> Konfirmasi ke WhatsApp Admin
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white pt-6 pb-4 px-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <button onClick={() => setCurrentScreen('main')} className="p-2 -ml-2 text-gray-800 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-bold text-lg text-gray-800">Keranjang Belanja</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-4">
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            {cart.map((item, index) => (
              <div key={item.id} className={`flex gap-3 p-2 ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100"><img src={item.image} className="w-full h-full object-cover" alt={item.name}/></div>
                <div className="flex-1 py-0.5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 text-xs leading-tight pr-2">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-green-600 text-sm">{formatRupiah(item.price)}</span>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                      <button onClick={() => updateCartQty(item.id, -1)} className="text-gray-600 hover:text-green-600"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="text-gray-600 hover:text-green-600"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <textarea value={orderNote} onChange={(e) => setOrderNote(e.target.value)} placeholder="Catatan opsional (Misal: Jangan pedas)..." className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none resize-none h-20 transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500"></textarea>
         </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] w-full max-w-md mx-auto">
         <button onClick={handleCheckoutClick} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-green-700 flex justify-between px-6 items-center active:scale-95 transition-all">
           <span>Lanjut Checkout</span> <ChevronRight className="w-5 h-5"/>
         </button>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white pt-6 pb-4 px-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => setCurrentScreen('cart')} className="p-2 -ml-2 text-gray-800 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-bold text-lg text-gray-800">Konfirmasi Pesanan</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
           <h2 className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">Detail Pengiriman</h2>
           <p className="font-bold text-gray-800 text-sm mb-1">{currentUser?.name}</p>
           <p className="text-xs text-gray-600 mb-3">{currentUser?.address}</p>
           <div className="flex gap-3">
              <div onClick={() => setDeliveryMethod('pickup')} className={`flex-1 border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${deliveryMethod === 'pickup' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <span className={`text-xs font-bold ${deliveryMethod === 'pickup' ? 'text-green-800' : 'text-gray-700'}`}>Ambil di Toko</span>
              </div>
              <div onClick={() => setDeliveryMethod('delivery')} className={`flex-1 border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${deliveryMethod === 'delivery' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <span className={`text-xs font-bold ${deliveryMethod === 'delivery' ? 'text-green-800' : 'text-gray-700'}`}>Delivery Lokal</span>
                <span className="text-[10px] text-gray-500">Rp{storeInfo.deliveryFee}</span>
              </div>
           </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
           <h2 className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">Metode Pembayaran</h2>
           <div className="flex gap-3 mb-4">
             <div onClick={() => setPaymentMethod('tunai')} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'tunai' ? 'border-green-600 bg-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
               <span className="text-xl mb-1">💵</span><span className="text-xs font-bold">Tunai</span>
             </div>
             <div onClick={() => setPaymentMethod('transfer')} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-green-600 bg-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
               <span className="text-xl mb-1">🏦</span><span className="text-xs font-bold">Transfer</span>
             </div>
           </div>
           
           <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 text-center relative overflow-hidden">
             {paymentMethod === 'tunai' && (
               <div className="animate-fade-in-down">
                 <ShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-2"/>
                 <h3 className="font-bold text-gray-800 text-sm">Tunai (Cash)</h3>
                 <p className="text-xs text-gray-500 mt-1">Siapkan uang tunai sejumlah <span className="font-bold text-green-600">{formatRupiah(grandTotal)}</span> saat pesanan diterima.</p>
               </div>
             )}
             {paymentMethod === 'transfer' && (
               <div className="animate-fade-in-down">
                 <h3 className="font-bold text-gray-800 text-sm mb-3">Transfer Bank</h3>
                 {bankAccounts.map(b => (
                   <div key={b.id} className="bg-white border border-gray-200 p-2 rounded-lg mb-2 text-center">
                     <p className="font-bold text-gray-800 text-sm tracking-widest">{b.bank} - {b.accNumber}</p>
                     <p className="text-[10px] text-gray-500">a.n {b.owner}</p>
                   </div>
                 ))}
                 <p className="text-xs text-gray-500 mt-3">Total Tagihan: <span className="font-bold text-green-600">{formatRupiah(grandTotal)}</span></p>
                 <p className="text-[10px] text-gray-400 mt-1 italic">*Upload bukti transfer di halaman riwayat pesanan setelah ini.</p>
               </div>
             )}
           </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal ({totalItems} brg)</span><span>{formatRupiah(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Ongkir</span><span>{formatRupiah(deliveryFee)}</span></div>
              <div className="border-t border-dashed border-gray-200 pt-3 mt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span><span className="text-green-600">{formatRupiah(grandTotal)}</span>
              </div>
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] w-full max-w-md mx-auto">
        <button onClick={processOrder} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-green-700 active:scale-95 transition-all">Buat Pesanan - {formatRupiah(grandTotal)}</button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
       <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full mix-blend-overlay blur-md"></div>
       <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full mix-blend-overlay blur-lg"></div>
       
       <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl relative z-10 animate-fade-in-down"><CheckCircle className="w-12 h-12 text-green-600" /></div>
       <h1 className="text-3xl font-bold mb-2 relative z-10">Pesanan Dibuat!</h1>
       <p className="text-green-100 mb-8 max-w-xs text-sm leading-relaxed relative z-10">Silakan lanjut ke halaman riwayat pesanan untuk melihat detail dan konfirmasi pembayaran Anda via WhatsApp.</p>
       
       <div className="w-full bg-white p-6 rounded-3xl text-gray-800 shadow-xl relative z-10">
         <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Total Pembayaran</p>
         <p className="text-3xl font-bold text-green-600 mb-6">{formatRupiah(orderHistory[0]?.total || 0)}</p>
         <button onClick={() => { setCurrentScreen('main'); setActiveTab('orders'); }} className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 active:scale-95 transition-all">Lihat Pesanan Saya</button>
       </div>
    </div>
  );

  const BottomNav = () => {
    if (['detail', 'cart', 'checkout', 'splash', 'success', 'auth'].includes(currentScreen)) return null;

    if (currentUser?.role === 'admin') {
      return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe max-w-md mx-auto z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          {[
            { id: 'ringkasan', icon: Store, label: 'Dashboard' },
            { id: 'produk', icon: Grid, label: 'Produk' },
            { id: 'pesanan', icon: FileText, label: 'Pesanan' },
            { id: 'pengaturan', icon: Settings, label: 'Pengaturan' }
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab('admin'); setAdminTab(item.id); }} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${adminTab === item.id ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <item.icon className={`w-6 h-6 ${adminTab === item.id ? 'fill-current opacity-20 stroke-2' : 'stroke-[1.5]'}`} />
              <span className={`text-[10px] font-medium ${adminTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe max-w-md mx-auto z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        {[
          { id: 'home', icon: Home, label: 'Beranda' },
          { id: 'orders', icon: FileText, label: 'Pesanan' },
          { id: 'profile', icon: User, label: 'Akun' },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === item.id ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-current opacity-20 stroke-2' : 'stroke-[1.5]'}`} />
            <span className={`text-[10px] font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center font-sans selection:bg-green-200">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col">
        {renderToast()}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
          .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        
        <div className="flex-grow w-full">
          {currentScreen === 'splash' && renderSplashScreen()}
          {currentScreen === 'auth' && renderAuthScreen()}
          
          {currentScreen === 'main' && activeTab === 'home' && renderHome()}
          {currentScreen === 'main' && activeTab === 'orders' && renderOrders()}
          {currentScreen === 'main' && activeTab === 'admin' && currentUser?.role === 'admin' && renderAdminDashboard()}
          {currentScreen === 'main' && activeTab === 'profile' && renderProfileTab()}
          
          {currentScreen === 'detail' && renderProductDetail()}
          {currentScreen === 'cart' && renderCart()}
          {currentScreen === 'checkout' && renderCheckout()}
          {currentScreen === 'success' && renderSuccess()}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
