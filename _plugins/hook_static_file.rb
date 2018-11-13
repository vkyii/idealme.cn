
module Jekyll

	module StaticFileExtensions
		def url
			
			@url ||= if @collection.nil?
			         relative_path
			       elsif @collection.metadata.nil?
			         ::Jekyll::URL.new({
			           :template => @collection.url_template,
			           :placeholders => placeholders
			         })
			       else
			         ::Jekyll::URL.new({
			           :template => "#{@collection.metadata.fetch('staticlink')}#{placeholders[:path]}",
			           :placeholders => placeholders
			         })
			       end.to_s.gsub(/\/$/, '')
		end
	end

	class StaticFile
	  prepend StaticFileExtensions
	end

end