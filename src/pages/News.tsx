
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import SEO from '@/components/SEO';
import BlogPostCard from '@/components/BlogPostCard';
import { blogPosts } from '@/data/blogPosts';

const News = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the newest blog post for the featured post section (the new post with id '6')
  const featuredPost = blogPosts.find(post => post.id === '6') || blogPosts[0];
  // Get the rest of the blog posts for the grid section
  const otherPosts = blogPosts.filter(post => post.id !== featuredPost?.id);
  
  return (
    <PageLayout>
      <SEO 
        title="Reforzo - News and insights about business optimization" 
        description="Stay updated with the latest news and insights about business optimization, operational excellence, and growth strategies from Reforzo."
        imageUrl={featuredPost?.imageUrl || "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png"}
        keywords={['business optimization', 'operational excellence', 'industry news', 'business growth', 'process improvement', 'consulting insights']}
        type="website"
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/2d779bca-15c0-4e61-89fd-621fb3dd9765.png" 
                  alt="Reforzo Logo" 
                  className="h-20 md:h-24 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:-translate-y-2 cursor-pointer transform"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Insights</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                The latest trends and insights in business optimization, operational excellence, and strategic growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPost && (
                <Link to={`/news/${featuredPost.slug}`} className="col-span-1 md:col-span-2 lg:col-span-3">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="grid md:grid-cols-2 h-full">
                      <div 
                        className="bg-cover bg-center h-64 md:h-full p-8 flex items-center justify-center"
                        style={{ 
                          backgroundImage: `url('${featuredPost.imageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="text-white text-center bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium inline-block mb-4">Featured</span>
                          <h3 className="text-2xl md:text-3xl font-bold">{featuredPost.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <p className="text-gray-500 text-sm mb-2">Published: {featuredPost.date}</p>
                        <p className="text-gray-700 mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <Button variant="outline" className="group">
                          Read more 
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )}
              
              {/* Other blog posts */}
              {otherPosts.map((post) => (
                <BlogPostCard 
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl || '/lovable-uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png'}
                  date={post.date}
                  slug={post.slug}
                  category={post.category}
                />
              ))}
              
              {/* If there are fewer than 3 published posts, add placeholders */}
              {blogPosts.length < 4 && Array.from({ length: Math.max(0, 4 - blogPosts.length) }).map((_, index) => (
                <BlogPostCard 
                  key={`placeholder-${index}`}
                  title="Upcoming article"
                  excerpt="Stay tuned for more exciting articles about business optimization and operational excellence."
                  imageUrl={index % 2 === 0 ? "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png" : "/lovable-uploads/700e27d7-0513-4bfa-8ac4-f7fd6087594c.png"}
                  date="Coming soon"
                  slug="#"
                  category="Upcoming"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default News;
