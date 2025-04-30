"use client"
import { useState, useEffect } from "react"
import NavBar from "../Components/NavBar"
import ProductCard from "../Components/ProductCard"
import { Filter, SlidersHorizontal, ChevronDown, ArrowUpDown, ChevronLeft, ChevronRight, X, Euro } from "lucide-react";
import PriceRangeSlider from "../Components/PriceRangeSlider";

export default function ProductExample() {
  // State for products and loading
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Transform API data to match our component's expected format
        const transformedProducts = data.data.map(product => ( { 
          
          id: product.id.toString(),
          title: product.nom,
          description: product.description,
          price: product.prix,
          location: product.localisation,
          imageUrl:  product.image && product.image[0] && product.image[0].url ? product.image[0].url : "/categories/h.jpg", // Default image since API doesn't provide one
          category: product.categorie,
          timePosted: formatTimePosted(product.dateDepot),
          sellerName: product.vendeur,
          sellerAvatar: "/images/man.png", // Default avatar since API doesn't provide one
          isNew: isNewProduct(product.dateDepot),
          isFeatured: false, // Default value since API doesn't provide this
        })); 
        console.log(data.data[7].image[0].url)
        setAllProducts(transformedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to format time posted
  const formatTimePosted = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heures`;
    } else if (diffInHours < 48) {
      return "Il y a 1 jour";
    } else if (diffInHours < 168) {
      return `Il y a ${Math.floor(diffInHours / 24)} jours`;
    } else {
      return `Il y a ${Math.floor(diffInHours / 168)} semaines`;
    }
  };

  // Helper function to determine if product is new (less than 7 days old)
  const isNewProduct = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return diffInDays < 7;
  };

  // Find min and max prices from products
  const minProductPrice = allProducts.length > 0 ? Math.min(...allProducts.map((product) => product.price)) : 0;
  const maxProductPrice = allProducts.length > 0 ? Math.max(...allProducts.map((product) => product.price)) : 1000;

  // State for filters and pagination
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: minProductPrice, max: maxProductPrice });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Extract unique categories
  const categories = ["Tous", ...new Set(allProducts.map((product) => product.category))];

  // Update price range when products are loaded
  useEffect(() => {
    if (allProducts.length > 0) {
      setPriceRange({ min: minProductPrice, max: maxProductPrice });
    }
  }, [allProducts, minProductPrice, maxProductPrice]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];
    const newActiveFilters = [];

    // Apply category filter
    if (selectedCategory !== "Tous") {
      result = result.filter((product) => product.category === selectedCategory);
      newActiveFilters.push({ type: "category", value: selectedCategory });
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);

    if (priceRange.min > minProductPrice || priceRange.max < maxProductPrice) {
      newActiveFilters.push({
        type: "price",
        value: `${priceRange.min.toFixed(0)}€ - ${priceRange.max.toFixed(0)}€`,
      });
    }

    // Apply sorting
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
      newActiveFilters.push({ type: "sort", value: "Prix croissant" });
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
      newActiveFilters.push({ type: "sort", value: "Prix décroissant" });
    } else if (sortOrder === "newest") {
      // This is a simplified sort based on the "Il y a X" text
      const timeMap = {
        heures: 1,
        jour: 24,
        jours: 24,
        semaine: 168,
        semaines: 168,
      };

      result.sort((a, b) => {
        const aMatch = a.timePosted.match(/Il y a (\d+) (\w+)/);
        const bMatch = b.timePosted.match(/Il y a (\d+) (\w+)/);

        if (aMatch && bMatch) {
          const aTime = Number.parseInt(aMatch[1]) * timeMap[aMatch[2]];
          const bTime = Number.parseInt(bMatch[1]) * timeMap[bMatch[2]];
          return aTime - bTime;
        }
        return 0;
      });
      newActiveFilters.push({ type: "sort", value: "Plus récent" });
    }

    setActiveFilters(newActiveFilters);
    setFilteredProducts(result);
    // setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, sortOrder, priceRange.min, priceRange.max, allProducts, minProductPrice, maxProductPrice]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("Tous");
    setSortOrder("default");
    setPriceRange({ min: minProductPrice, max: maxProductPrice });
  };

  // Remove a specific filter
  const removeFilter = (filter) => {
    if (filter.type === "category") {
      setSelectedCategory("Tous");
    } else if (filter.type === "price") {
      setPriceRange({ min: minProductPrice, max: maxProductPrice });
    } else if (filter.type === "sort") {
      setSortOrder("default");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Découvrez nos produits</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
            <p>Erreur: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-500">Filtres actifs:</span>
                  {activeFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200 text-sm"
                    >
                      <span className="mr-2">{filter.value}</span>
                      <button onClick={() => removeFilter(filter)} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button onClick={resetFilters} className="text-sm text-orange-500 hover:text-orange-600 ml-2">
                    Réinitialiser tout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium">Filtres et tri</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${isMobileFilterOpen ? "transform rotate-180" : ""}`}
                />
              </button>

              {isMobileFilterOpen && (
                <div className="mt-3 p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Catégorie</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            selectedCategory === category
                              ? "bg-orange-100 text-orange-600 font-medium"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                      <Euro className="h-4 w-4 mr-2 text-orange-500" />
                      Fourchette de prix
                    </h3>
                    <PriceRangeSlider min={minProductPrice} max={maxProductPrice} onChange={setPriceRange} />
                  </div>

                  {/* Sort Order */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Trier par</h3>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="default">Pertinence</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="newest">Plus récent</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar Filter */}
              <div className="hidden md:block w-72 flex-shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-28">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <SlidersHorizontal className="h-5 w-5 mr-2 text-orange-500" />
                      Filtres
                    </h2>
                    {activeFilters.length > 0 && (
                      <button onClick={resetFilters} className="text-sm text-orange-500 hover:text-orange-600">
                        Réinitialiser
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Catégories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`category-${category}`}
                            type="radio"
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                          />
                          <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                      <Euro className="h-4 w-4 mr-2 text-orange-500" />
                      Fourchette de prix
                    </h3>
                    <PriceRangeSlider min={minProductPrice} max={maxProductPrice} onChange={setPriceRange} />
                  </div>

                  {/* Sort Order */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2 text-orange-500" />
                      Trier par
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="sort-default"
                          type="radio"
                          name="sort"
                          checked={sortOrder === "default"}
                          onChange={() => setSortOrder("default")}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="sort-default" className="ml-2 text-sm text-gray-700">
                          Pertinence
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sort-price-asc"
                          type="radio"
                          name="sort"
                          checked={sortOrder === "price-asc"}
                          onChange={() => setSortOrder("price-asc")}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="sort-price-asc" className="ml-2 text-sm text-gray-700">
                          Prix croissant
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sort-price-desc"
                          type="radio"
                          name="sort"
                          checked={sortOrder === "price-desc"}
                          onChange={() => setSortOrder("price-desc")}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="sort-price-desc" className="ml-2 text-sm text-gray-700">
                          Prix décroissant
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sort-newest"
                          type="radio"
                          name="sort"
                          checked={sortOrder === "newest"}
                          onChange={() => setSortOrder("newest")}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="sort-newest" className="ml-2 text-sm text-gray-700">
                          Plus récent
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Results Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{filteredProducts.length}</span> produits trouvés
                      {selectedCategory !== "Tous" && ` dans "${selectedCategory}"`}
                    </p>

                    {/* Desktop Sort Dropdown */}
                    <div className="hidden md:flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Trier par:</span>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="default">Pertinence</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="newest">Plus récent</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                {currentProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-600">Aucun produit ne correspond à vos critères de recherche.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}

                {/* Pagination - Fixed Version */}
                {filteredProducts.length > productsPerPage && (
                  <div className="mt-10 flex justify-center">
                    <nav className="flex items-center gap-1">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Page précédente"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {/* Always show first page */}
                      <button
                        onClick={() => paginate(1)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === 1
                            ? "bg-orange-500 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        1
                      </button>

                      {/* Show ellipsis if current page is far from start */}
                      {currentPage > 3 && (
                        <span className="px-4 py-2">...</span>
                      )}

                      {/* Show pages around current page */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                        if (number > 1 && number < totalPages && Math.abs(number - currentPage) <= 1) {
                          return (
                            <button
                              key={number}
                              onClick={() => paginate(number)}
                              className={`px-4 py-2 rounded-md ${
                                currentPage === number
                                  ? "bg-orange-500 text-white"
                                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {number}
                            </button>
                          );
                        }
                        return null;
                      })}

                      {/* Show ellipsis if current page is far from end */}
                      {currentPage < totalPages - 2 && (
                        <span className="px-4 py-2">...</span>
                      )}

                      {/* Always show last page if there's more than one page */}
                      {totalPages > 1 && (
                        <button
                          onClick={() => paginate(totalPages)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === totalPages
                              ? "bg-orange-500 text-white"
                              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {totalPages}
                        </button>
                      )}

                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Page suivante"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}