source 'https://rubygems.org'

# Match the hosted Pages renderer and install only plugins used by this site.
gem 'jekyll', '~> 3.10.0'
gem 'webrick'
gem 'kramdown-parser-gfm'

group :jekyll_plugins do
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
  gem 'jekyll-paginate'
  gem 'jekyll-sitemap'
  gem 'jekyll-redirect-from'
  # jekyll-mentions intentionally omitted — it parses content as HTML to
  # rewrite @-mentions into links, which lowercases SVG attributes
  # (viewBox -> viewbox, etc.) wherever an SVG include contains an
  # @-prefixed token (e.g. Lucide's "@license" header). Re-enable only
  # if @-mention rewriting is actually wanted.
  gem 'jekyll-relative-links'
end

# Windows / JRuby don't ship tzinfo by default
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '~> 1.2'
  gem 'tzinfo-data'
end
