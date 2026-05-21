/**
 * UI Module - Handles DOM manipulation and card rendering
 */

const UI = {
    currentMarkets: [],
    selectedFilters: {
        locations: [],
        marketTypes: [],
        products: []
    },
    searchOptions: {
        locations: [],
        marketTypes: [],
        products: []
    },
    activeMarketId: null,

    /**
     * Initialize UI - Set up event listeners
     */
    init() {
        this.setupEventListeners();
        this.loadFiltersFromStorage();
    },

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Menu toggle on mobile
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Clear filters button
        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearAllFilters();
        });

        const searchInput = document.getElementById('searchInput');
        const suggestionBox = document.getElementById('searchSuggestions');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            this.handleSearch(query);
            this.updateSearchSuggestions(query);
        });

        searchInput.addEventListener('focus', (e) => {
            this.updateSearchSuggestions(e.target.value);
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.search-bar')) {
                this.clearSearchSuggestions();
            }
        });

        suggestionBox.addEventListener('click', (event) => {
            const suggestion = event.target.closest('.search-suggestion');
            if (suggestion) {
                const value = suggestion.dataset.suggestion;
                searchInput.value = value;
                this.handleSearch(value);
                this.clearSearchSuggestions();
            }
        });
    },

    /**
     * Populate filter sections with predefined options
     */
    populateFilters(markets) {
        // Predefined filter options as specified by user
        const locations = [
            'Navigli',
            'Brera',
            'Centrale',
            'Garibaldi',
            'Porta Ticinese',
            'Isola',
            'Tortona',
            'Sempione',
            'Bicocca',
            'Rho-Pero'
        ];

        const marketTypes = [
            'markets',
            'vintage store',
            'vintage market',
            'local market',
            'weekly market',
            'special market event',
            'outdoor market'
        ];

        const products = [
            'Vintage',
            'Second Hand',
            'Clothes',
            'Food',
            'Home & decor',
            'Handmade',
            'Antiques',
            'collectibles'
        ];

        this.searchOptions = {
            locations,
            marketTypes,
            products
        };

        this.createFilterCheckboxes('locationFilter', locations);
        this.createFilterCheckboxes('marketTypeFilter', marketTypes);
        this.createFilterCheckboxes('productFilter', products);

        // Add change listeners to all checkboxes
        this.setupFilterListeners();
    },

    /**
     * Create filter checkboxes for a given category
     */
    createFilterCheckboxes(containerId, values) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        values.forEach(value => {
            const div = document.createElement('div');
            div.className = 'filter-checkbox';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = value;
            input.id = `filter-${value.replace(/\s+/g, '-').toLowerCase()}`;

            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = value;

            div.appendChild(input);
            div.appendChild(label);
            container.appendChild(div);
        });
    },

    /**
     * Setup filter change listeners
     */
    setupFilterListeners() {
        const checkboxes = document.querySelectorAll('.filter-checkbox input');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSelectedFilters();
                window.filteredMarkets = this.filterMarkets(this.currentMarkets);
                this.renderCards(window.filteredMarkets);
                window.updateMapMarkers(window.filteredMarkets);
                this.saveFiltersToStorage();
            });
        });
    },

    /**
     * Update selected filters from checkboxes
     */
    updateSelectedFilters() {
        this.selectedFilters = {
            locations: Array.from(document.querySelectorAll('#locationFilter input:checked')).map(cb => cb.value),
            marketTypes: Array.from(document.querySelectorAll('#marketTypeFilter input:checked')).map(cb => cb.value),
            products: Array.from(document.querySelectorAll('#productFilter input:checked')).map(cb => cb.value)
        };
    },

    /**
     * Filter markets based on selected filters
     */
    filterMarkets(markets) {
        return markets.filter(market => {
            // Location matching - map predefined areas to market names
            const locationMatch = this.selectedFilters.locations.length === 0 ||
                this.selectedFilters.locations.some(loc => this.matchesLocation(market, loc));

            // Market type matching - direct comparison
            const typeMatch = this.selectedFilters.marketTypes.length === 0 ||
                this.selectedFilters.marketTypes.some(type => this.matchesMarketType(market, type));

            // Product matching - direct comparison
            const productMatch = this.selectedFilters.products.length === 0 ||
                this.selectedFilters.products.some(product => market.products.includes(product));

            return locationMatch && typeMatch && productMatch;
        });
    },

    /**
     * Check if market matches a location area
     */
    matchesLocation(market, location) {
        const marketName = market.name.toLowerCase();
        const locationLower = location.toLowerCase();

        // Direct name matching
        if (marketName.includes(locationLower)) {
            return true;
        }

        // Specific area mappings
        const areaMappings = {
            'navigli': ['navigli', 'naviglio'],
            'brera': ['brera'],
            'centrale': ['centrale', 'stazione centrale'],
            'garibaldi': ['garibaldi', 'corso garibaldi'],
            'porta ticinese': ['porta ticinese', 'ticinese'],
            'isola': ['isola'],
            'tortona': ['tortona'],
            'sempione': ['sempione', 'sempione park'],
            'bicocca': ['bicocca', 'bicocca university'],
            'rho-pero': ['rho', 'pero', 'rho-pero']
        };

        const keywords = areaMappings[locationLower] || [locationLower];
        return keywords.some(keyword => marketName.includes(keyword));
    },

    /**
     * Check if market matches a market type
     */
    matchesMarketType(market, type) {
        const marketTypes = market.marketType.map(t => t.toLowerCase());
        const typeLower = type.toLowerCase();

        // Direct matching
        if (marketTypes.includes(typeLower)) {
            return true;
        }

        // Type mappings for broader matching
        const typeMappings = {
            'markets': ['market', 'markets'],
            'vintage store': ['thrift market', 'second-hand clothes', 'vintage market'],
            'vintage market': ['vintage market', 'antique market', 'flea market'],
            'local market': ['local market', 'food market', 'daily market'],
            'weekly market': ['weekly market', 'weekend market', 'street market'],
            'special market event': ['monthly fair', 'seasonal fair', 'special event'],
            'outdoor market': ['outdoor market', 'street market', 'park market']
        };

        const keywords = typeMappings[typeLower] || [typeLower];
        return keywords.some(keyword =>
            marketTypes.some(marketType => marketType.includes(keyword))
        );
    },

    /**
     * Render market cards to the grid
     */
    renderCards(markets) {
        const cardsGrid = document.getElementById('cardsGrid');
        const noResults = document.getElementById('noResults');

        if (markets.length === 0) {
            cardsGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        cardsGrid.innerHTML = markets.map(market => this.createCardHTML(market)).join('');

        // Add event listeners to cards
        markets.forEach(market => {
            const card = document.querySelector(`[data-market-id="${market.id}"]`);
            if (card) {
                card.addEventListener('click', () => {
                    this.selectMarket(market.id);
                    window.centerMapOnMarket(market);
                });

                // Pin button (visited)
                const pinBtn = card.querySelector('.card-pin');
                pinBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.togglePin(pinBtn, market.id);
                });

                // Heart button (favorites)
                const heartBtn = card.querySelector('.card-heart');
                heartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleHeart(heartBtn, market.id);
                });
            }
        });
    },

    /**
     * Create HTML for a single market card
     */
    createCardHTML(market) {
        const isLiked = this.isMarketLiked(market.id);
        const isVisited = this.isMarketVisited(market.id);
        const locationText = market.name.split(' ').slice(0, 2).join(' ');

        return `
            <div class="market-card" data-market-id="${market.id}">
                <img src="${market.image}" alt="${market.name}" class="card-image" onerror="this.src='https://via.placeholder.com/400x300?text=Market+Image'">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${market.name}</h3>
                        <div class="card-icons">
                            <button class="card-pin ${isVisited ? 'visited' : ''}" data-market-id="${market.id}" aria-label="Mark as visited">
                                📍
                            </button>
                            <button class="card-heart ${isLiked ? 'liked' : ''}" data-market-id="${market.id}" aria-label="Add to favorites">
                                ${isLiked ? '❤' : '🤍'}
                            </button>
                        </div>
                    </div>
                    <div class="card-location">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                        </svg>
                        ${locationText}
                    </div>
                    <div class="card-tags">
                        ${market.marketType.slice(0, 2).map(type => `<span class="card-tag">${type}</span>`).join('')}
                    </div>
                    <div class="card-tags">
                        ${market.products.slice(0, 3).map(product => `<span class="card-tag">${product}</span>`).join('')}
                    </div>
                    <p class="card-description">${market.description}</p>
                </div>
            </div>
        `;
    },

    /**
     * Select a market and highlight its card
     */
    selectMarket(marketId) {
        document.querySelectorAll('.market-card').forEach(card => {
            card.classList.remove('active');
        });

        const card = document.querySelector(`[data-market-id="${marketId}"]`);
        if (card) {
            card.classList.add('active');
            this.activeMarketId = marketId;
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    },

    /**
     * Handle market search
     */
    handleSearch(query) {
        const filtered = this.currentMarkets.filter(market => {
            const searchTerm = query.toLowerCase();
            return (
                market.name.toLowerCase().includes(searchTerm) ||
                market.description.toLowerCase().includes(searchTerm) ||
                this.matchesLocation(market, query) ||
                market.marketType.some(type => type.toLowerCase().includes(searchTerm)) ||
                market.products.some(product => product.toLowerCase().includes(searchTerm))
            );
        });

        this.renderCards(filtered);
        window.updateMapMarkers(filtered);
    },

    updateSearchSuggestions(query) {
        const suggestionBox = document.getElementById('searchSuggestions');
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            this.clearSearchSuggestions();
            return;
        }

        const suggestions = this.getSearchSuggestions(trimmedQuery);
        if (suggestions.length === 0) {
            this.clearSearchSuggestions();
            return;
        }

        suggestionBox.innerHTML = suggestions.map(suggestion => `
            <button type="button" class="search-suggestion" data-suggestion="${suggestion}">
                ${suggestion}
            </button>
        `).join('');
        suggestionBox.classList.add('visible');
    },

    getSearchSuggestions(query) {
        const searchTerm = query.toLowerCase();
        const suggestions = new Set();

        // Match market names and market location hints
        this.currentMarkets.forEach(market => {
            if (market.name.toLowerCase().includes(searchTerm)) {
                suggestions.add(market.name);
            }

            if (market.description.toLowerCase().includes(searchTerm)) {
                const match = market.description.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g);
                if (match) {
                    match.forEach(item => {
                        if (item.toLowerCase().includes(searchTerm)) {
                            suggestions.add(item);
                        }
                    });
                }
            }
        });

        const allStaticOptions = [
            ...this.searchOptions.locations,
            ...this.searchOptions.marketTypes,
            ...this.searchOptions.products
        ];

        allStaticOptions.forEach(option => {
            if (option.toLowerCase().includes(searchTerm)) {
                suggestions.add(option);
            }
        });

        return Array.from(suggestions).slice(0, 10);
    },

    clearSearchSuggestions() {
        const suggestionBox = document.getElementById('searchSuggestions');
        suggestionBox.innerHTML = '';
        suggestionBox.classList.remove('visible');
    },

    /**
     * Toggle heart (favorite) on a market
     */
    toggleHeart(heartBtn, marketId) {
        const liked = this.isMarketLiked(marketId);
        
        if (liked) {
            this.removeFavorite(marketId);
            heartBtn.textContent = '🤍';
            heartBtn.classList.remove('liked');
        } else {
            this.addFavorite(marketId);
            heartBtn.textContent = '❤';
            heartBtn.classList.add('liked');
        }
    },

    /**
     * Toggle pin (visited) on a market
     */
    togglePin(pinBtn, marketId) {
        const visited = this.isMarketVisited(marketId);
        
        if (visited) {
            this.removeVisited(marketId);
            pinBtn.textContent = '📍';
            pinBtn.classList.remove('visited');
        } else {
            this.addVisited(marketId);
            pinBtn.textContent = '📌';
            pinBtn.classList.add('visited');
        }
    },

    /**
     * Add market to favorites (localStorage)
     */
    addFavorite(marketId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteMarkets')) || [];
        if (!favorites.includes(marketId)) {
            favorites.push(marketId);
            localStorage.setItem('favoriteMarkets', JSON.stringify(favorites));
        }
    },

    /**
     * Remove market from favorites
     */
    removeFavorite(marketId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteMarkets')) || [];
        const index = favorites.indexOf(marketId);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favoriteMarkets', JSON.stringify(favorites));
        }
    },

    /**
     * Check if a market is in favorites
     */
    isMarketLiked(marketId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteMarkets')) || [];
        return favorites.includes(marketId);
    },

    /**
     * Add market to visited (localStorage)
     */
    addVisited(marketId) {
        const visited = JSON.parse(localStorage.getItem('visitedMarkets')) || [];
        if (!visited.includes(marketId)) {
            visited.push(marketId);
            localStorage.setItem('visitedMarkets', JSON.stringify(visited));
        }
    },

    /**
     * Remove market from visited
     */
    removeVisited(marketId) {
        const visited = JSON.parse(localStorage.getItem('visitedMarkets')) || [];
        const index = visited.indexOf(marketId);
        if (index > -1) {
            visited.splice(index, 1);
            localStorage.setItem('visitedMarkets', JSON.stringify(visited));
        }
    },

    /**
     * Check if a market has been visited
     */
    isMarketVisited(marketId) {
        const visited = JSON.parse(localStorage.getItem('visitedMarkets')) || [];
        return visited.includes(marketId);
    },

    /**
     * Clear all filters
     */
    clearAllFilters() {
        document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
            checkbox.checked = false;
        });

        this.selectedFilters = {
            locations: [],
            marketTypes: [],
            products: []
        };

        window.filteredMarkets = this.currentMarkets;
        this.renderCards(this.currentMarkets);
        window.updateMapMarkers(this.currentMarkets);
        this.saveFiltersToStorage();
    },

    /**
     * Save filter state to localStorage
     */
    saveFiltersToStorage() {
        localStorage.setItem('selectedFilters', JSON.stringify(this.selectedFilters));
    },

    /**
     * Load filter state from localStorage
     */
    loadFiltersFromStorage() {
        const saved = localStorage.getItem('selectedFilters');
        if (saved) {
            this.selectedFilters = JSON.parse(saved);
        }
    },

    /**
     * Restore checked filters from saved state
     */
    restoreCheckedFilters() {
        this.selectedFilters.locations.forEach(value => {
            const checkbox = document.querySelector(`#filter-${value.replace(/\s+/g, '-').toLowerCase()}`);
            if (checkbox) checkbox.checked = true;
        });

        this.selectedFilters.marketTypes.forEach(value => {
            const checkbox = document.querySelector(`#filter-${value.replace(/\s+/g, '-').toLowerCase()}`);
            if (checkbox) checkbox.checked = true;
        });

        this.selectedFilters.products.forEach(value => {
            const checkbox = document.querySelector(`#filter-${value.replace(/\s+/g, '-').toLowerCase()}`);
            if (checkbox) checkbox.checked = true;
        });
    }
};
