
# 加了ispost标记,collection下面的'_'开头的目录里的文档也会被解析

module Jekyll

	module EntryFilterExtensions
    	SPECIAL_LEADING_CHARACTERS2 = ['.', '#'].freeze

	    def filter2(entries)
	      entries.reject do |e|
	        unless included?(e)
	          special2?(e) || backup?(e) || excluded?(e) || symlink?(e)
	        end
	      end
	    end

	    def special2?(entry)
	      SPECIAL_LEADING_CHARACTERS2.include?(entry[0..0]) ||
	        SPECIAL_LEADING_CHARACTERS2.include?(File.basename(entry)[0..0])
	    end
	end

	class EntryFilter
		prepend EntryFilterExtensions
	end

	module CollectionExtensions
	    
	    def filtered_entries
	      return [] unless exists?
	       if metadata.fetch('ispost', false)
		    	@filtered_entries ||=
			        Dir.chdir(directory) do
			          entry_filter.filter2(entries).reject do |f|
			            path = collection_dir(f)
			            File.directory?(path) || (File.symlink?(f) && site.safe)
			          end
			        end
		    else
		    	@filtered_entries ||=
			        Dir.chdir(directory) do
			          entry_filter.filter(entries).reject do |f|
			            path = collection_dir(f)
			            File.directory?(path) || (File.symlink?(f) && site.safe)
			          end
			        end
		    end
	     end
	end

	class Collection
	  prepend CollectionExtensions
	end

end