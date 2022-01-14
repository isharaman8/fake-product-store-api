<h1>Mock Product Store Api</h1>
<hr>

<h3>A mock api to perform filter/sort query operations on the database</h3>
<hr>

<h2>Endpoints</h2>
<p>Supported POST endpoints</p>
<ul>
  <li><strong>/products</strong>: create product</li>
</ul>

<p>Supported GET endpoints</p>
<ul>
  <li><strong>/products</strong>: get all products (pagination - 10 per request if no query is provided)</li>
  <li><strong>/products/:productID</strong>: get one product by id</li>
</ul>

<p>Supported Patch endpoints</p>
<ul>
  <li><strong>/products/:productID</strong>: update product</li>
</ul>

<p>Supported Delete endpoints</p>
<ul>
  <li><strong>/products/:productID</strong>: delete product</li>
</ul>
<hr>

<h2>GET queries</h2>
<ul>
  <li><strong>featured (boolean)</strong>: returns all the products that featured or not according to query provided</li>
  
  <li><strong>company</strong>: returns all the products based on given company name</li>
  <li><strong>name (product name)</strong>: returns all the products with similar name</li>
  <li><strong>sort</strong>: sorts products based on query provided (eg sort=name,price will sort based on name first and where products have similar names the one with lower price will come first.) Note: to sort in decreasing order put - before query (eg sort=-name) will give products in descending order</li>
  <li><strong>fields</strong>: returns only those fields that are provided in qeury. (eg fields=name,price) will return only name and price fields.</li>
  <li><strong>numericFilters</strong>: returns filtered products based on query provided (eg numericFilters=price>30,rating<4.5) will return all products where price is greater than 30 and rating is less than 4.5)</li>
</ul>
<hr>
<h3>How to use?</h3>

<p>To make it working, connect your own database by providing your connection string. To fill products in your database, use populate.js<p>
