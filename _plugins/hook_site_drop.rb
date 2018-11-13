

# 加了ispost标记,tag和categories会包含

module Jekyll
	module Drops

		module SiteDropExtensions
		      def posts
		      	
		        @site_posts ||=  @obj.collections.select {|key, collection|
		          collection.metadata.fetch('ispost', false) || key=="posts"
		        }.values.map! { |collection|
		          collection.docs
		        }.reduce(:+).sort { |a, b| b <=> a }
		        
		        # @site_posts ||= @obj.posts.docs.sort { |a, b| b <=> a }

		      end
		end

		class SiteDrop
		  prepend SiteDropExtensions
		end
	end
end