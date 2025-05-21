import FilteredBlog from '@components/FilteredBlog';
import AppData from '@data/app.json';
import PageBanner from '@components/PageBanner';
import Sidebar from '@components/Sidebar';
import { generateJsonPostsData } from '@library/posts';
import { promises as fs } from 'fs';

export const metadata = {
    title: {
        default: 'Search',
    },
    description: AppData.settings.siteDescription,
};

export default async function Search({ searchParams }) {
    const searchQuery = searchParams?.query || '';
    await generateJsonPostsData();
    const file = await fs.readFile(process.cwd() + '/src/data/.json/posts.json', 'utf8');
    const posts = JSON.parse(file);
    const filteredPosts = searchQuery
        ? posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : posts;

    return (
        <>
            <PageBanner
                pageTitle={`Search: ${searchQuery || 'All'}`}
                breadTitle={'Search'}
                bgImage={'/img/photo/12.jpg'}
            />

            {/* blog */}
            <section>
                <div className="container mil-p-120-60">
                    <div className="mil-background-grid mil-softened"></div>
                    <div className="row justify-content-between">
                        <div className="col-lg-7">
                            <FilteredBlog posts={filteredPosts} />
                        </div>
                        <div className="col-lg-5">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
            {/* blog end */}
        </>
    );
}