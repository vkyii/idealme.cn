

# 加了ispost标记,tag和categories会包含

module Jekyll

	module SiteExtensions
	    def post_attr_hash(post_attr)
	      # Build a hash map based on the specified post attribute ( post attr =>
	      # array of posts ) then sort each array in reverse order.
	      hash = Hash.new { |h, key| h[key] = [] }
	      posts.docs.each { |p| p.data[post_attr].each { |t| hash[t] << p } if p.data[post_attr] }
	      collections.each do |key, collection|
	        if collection.metadata.fetch('ispost', false)
	          collection.docs.each { |p| p.data[post_attr].each { |t| hash[t] << p } if p.data[post_attr] }
	        end
	      end
	      hash.values.each { |posts| posts.sort!.reverse! }
	      hash
	    end
	end

	class Site
	  prepend SiteExtensions
	end

end