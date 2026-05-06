source 'https://rubygems.org'

# GitHub Pages pins Jekyll and the safelist of plugins.
# https://pages.github.com/versions/
gem 'github-pages', '~> 232', group: :jekyll_plugins

# Plugins below are included in the github-pages gem set, listed
# explicitly so the build is deterministic locally as well.
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
