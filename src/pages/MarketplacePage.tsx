import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingCart,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProduceListing, CropCategory } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const MarketplacePage: React.FC = () => {
  const { produceListings, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search & Filter state
  const queryParam = searchParams.get('query') || '';
  const itemParam = searchParams.get('item') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'quantity'>('featured');

  // Detail Modal state
  const [selectedProduct, setSelectedProduct] = useState<ProduceListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(100);

  // Sync search param
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  // Open modal if item query param is present
  useEffect(() => {
    if (itemParam) {
      const match = produceListings.find((p) => p.id === itemParam);
      if (match) {
        setSelectedProduct(match);
        setOrderQuantity(match.minOrderQuantity);
      }
    }
  }, [itemParam, produceListings]);

  // Available unique districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(produceListings.map((p) => p.district)));
    return ['All', ...list];
  }, [produceListings]);

  // Categories
  const categories: string[] = ['All', 'Vegetables', 'Fruits', 'Grains & Cereals', 'Pulses', 'Spices'];

  // Filtered and sorted listings
  const filteredProduce = useMemo(() => {
    return produceListings
      .filter((item) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCrop = item.cropName.toLowerCase().includes(q);
          const matchDist = item.district.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchFarmer = item.farmerName.toLowerCase().includes(q);
          const matchVariety = item.variety?.toLowerCase().includes(q);
          if (!matchCrop && !matchDist && !matchLoc && !matchFarmer && !matchVariety) return false;
        }
        // Category
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // District
        if (selectedDistrict !== 'All' && item.district !== selectedDistrict) {
          return false;
        }
        // Organic
        if (organicOnly && !item.isOrganic) {
          return false;
        }
        // Price
        if (item.pricePerUnit > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price_desc') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'quantity') return b.quantityAvailable - a.quantityAvailable;
        return 0; // Default featured
      });
  }, [produceListings, searchQuery, selectedCategory, selectedDistrict, organicOnly, maxPrice, sortBy]);

  const handleOpenDetail = (item: ProduceListing) => {
    setSelectedProduct(item);
    setOrderQuantity(item.minOrderQuantity);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    if (searchParams.has('item')) {
      searchParams.delete('item');
      setSearchParams(searchParams);
    }
  };

  const handleAddToCart = (item: ProduceListing, qty: number) => {
    addToCart(item, qty);
    handleCloseDetail();
  };

  const handleBuyNow = (item: ProduceListing, qty: number) => {
    addToCart(item, qty);
    handleCloseDetail();
    navigate('/cart');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setOrganicOnly(false);
    setMaxPrice(15000);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--color-on-surface-muted)',
              marginBottom: '8px',
            }}
          >
            <span>Marketplace</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Farm Direct Catalog</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h1 style={{ fontSize: '2.2rem' }}>Buyer Agricultural Marketplace</h1>
              <p style={{ marginTop: '4px' }}>
                Procure freshly harvested crops directly from verified Maharashtra farmers with transparent weighing and escrow protection.
              </p>
            </div>
            <button onClick={() => navigate('/cart')} className="btn btn-primary btn-sm">
              <ShoppingCart size={16} />
              <span>View Cart & Checkout</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="card"
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-surface-lowest)',
            marginBottom: '32px',
          }}
        >
          {/* Top Row: Search input + Category Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 300px',
              }}
            >
              <Search
                size={18}
                color="var(--color-on-surface-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by crop, farmer, or location..."
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                Sort:
              </span>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{ width: 'auto', padding: '8px 12px' }}
              >
                <option value="featured">Featured Fresh</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="quantity">Largest Quantity</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--color-border-subtle)',
              marginBottom: '16px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn btn-sm"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-surface-low)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--color-on-surface)',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  fontSize: '0.825rem',
                  padding: '6px 14px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters: District, Price range, Organic toggle, Reset */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
              fontSize: '0.875rem',
            }}
          >
            {/* District Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--color-secondary)" />
              <label style={{ fontWeight: 600 }}>District:</label>
              <select
                className="form-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                style={{ width: 'auto', padding: '6px 10px', fontSize: '0.85rem' }}
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Organic Toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
              />
              <span>Organic Certified Only</span>
            </label>

            {/* Max Price Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 600 }}>Max Price: ₹{maxPrice.toLocaleString()}</span>
              <input
                type="range"
                min="50"
                max="15000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '120px', accentColor: 'var(--color-primary)' }}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="btn btn-ghost btn-sm"
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-secondary)',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          <span>
            Showing <strong>{filteredProduce.length}</strong> available crops matching criteria
          </span>
          {organicOnly && <span className="badge badge-success">Organic Only Active</span>}
        </div>

        {/* Produce Cards Grid */}
        {filteredProduce.length === 0 ? (
          <div
            className="card"
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface-lowest)',
            }}
          >
            <Info size={40} color="var(--color-on-surface-muted)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ marginBottom: '8px' }}>No Harvests Found</h3>
            <p style={{ maxWidth: '440px', margin: '0 auto 20px auto' }}>
              We could not find any produce listings matching your current filter set. Try broadening your price limit or clearing the district filter.
            </p>
            <button onClick={resetFilters} className="btn btn-primary btn-sm">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredProduce.map((item) => (
              <div
                key={item.id}
                className="card card-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-surface-lowest)',
                }}
              >
                {/* Crop Image */}
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-surface-container)',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleOpenDetail(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.cropName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <Badge variant="primary">{item.category}</Badge>
                    {item.isOrganic && <Badge variant="success">Organic</Badge>}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(8, 36, 26, 0.88)',
                      color: '#ffffff',
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item.qualityGrade.split(' ')[0]} {item.qualityGrade.split(' ')[1]}
                  </div>
                </div>

                {/* Info Container */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3
                      style={{ fontSize: '1.15rem', cursor: 'pointer' }}
                      onClick={() => handleOpenDetail(item)}
                    >
                      {item.cropName}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: 'var(--color-on-surface-variant)',
                      marginBottom: '10px',
                    }}
                  >
                    <MapPin size={15} color="var(--color-secondary)" />
                    <span>
                      {item.location}, {item.district}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-on-surface-variant)',
                      lineHeight: 1.5,
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-on-surface-muted)',
                      marginBottom: '16px',
                    }}
                  >
                    Farmer: <strong>{item.farmerName}</strong> • Harvested: {item.harvestDate}
                  </div>

                  {/* Price & Purchase Actions */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(114, 121, 116, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--color-primary)',
                        }}
                      >
                        ₹{item.pricePerUnit.toLocaleString('en-IN')}
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-on-surface-muted)' }}>
                          {' '}/ {item.unit}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--color-secondary)' }}>
                        Min Order: {item.minOrderQuantity} {item.unit}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="btn btn-primary btn-sm"
                    >
                      <ShoppingCart size={15} />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Produce Details Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={handleCloseDetail}
          title={selectedProduct.cropName}
          subtitle={`Direct from ${selectedProduct.farmerName} in ${selectedProduct.location}, ${selectedProduct.district}`}
          maxWidth="700px"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', display: 'block' }}>
                  Subtotal (Excl. Freight):
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                  }}
                >
                  ₹{(selectedProduct.pricePerUnit * orderQuantity).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleAddToCart(selectedProduct, orderQuantity)}
                  className="btn btn-outline"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => handleBuyNow(selectedProduct, orderQuantity)}
                  className="btn btn-primary"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Image Preview & Key Badges */}
            <div
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}
            >
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.cropName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <Badge variant="primary">{selectedProduct.category}</Badge>
                {selectedProduct.isOrganic && <Badge variant="success">Organic Certified</Badge>}
              </div>
            </div>

            {/* Spec Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'var(--color-surface-low)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Quality Grade
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                  {selectedProduct.qualityGrade}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Harvest Date
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-on-surface)' }}>
                  {selectedProduct.harvestDate}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Shelf Life
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-on-surface)' }}>
                  ~{selectedProduct.shelfLifeDays} Days
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Available Inventory
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                  {selectedProduct.quantityAvailable.toLocaleString()} {selectedProduct.unit}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Crop & Harvest Overview</h4>
              <p style={{ lineHeight: 1.6, fontSize: '0.925rem' }}>{selectedProduct.description}</p>
            </div>

            {/* Farmer Contact Info */}
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cultivator: {selectedProduct.farmerName}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-variant)' }}>
                  {selectedProduct.location}, {selectedProduct.district} • Contact: {selectedProduct.farmerPhone}
                </div>
              </div>
              <span className="badge badge-verified">Verified Farm</span>
            </div>

            {/* Quantity Selector */}
            <div
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-primary)',
                backgroundColor: 'var(--color-surface-lowest)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Select Procurement Quantity ({selectedProduct.unit}):
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)' }}>
                  Min order: {selectedProduct.minOrderQuantity} {selectedProduct.unit}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="number"
                  min={selectedProduct.minOrderQuantity}
                  max={selectedProduct.quantityAvailable}
                  step={selectedProduct.unit === 'tonne' || selectedProduct.unit === 'quintal' ? 1 : 10}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Math.max(selectedProduct.minOrderQuantity, Number(e.target.value)))}
                  className="form-input"
                  style={{ width: '160px', fontWeight: 700, fontSize: '1.1rem' }}
                />
                <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
                  @ ₹{selectedProduct.pricePerUnit} per {selectedProduct.unit}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
