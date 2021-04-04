import { html } from '../node_modules/lit-html/lit-html.js';
import { createArticle } from '../src/api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
            <h1>Create Article</h1>

            <form id="create" @submit=${onSubmit}>
                <fieldset>
                    <p class="field title">
                        <label for="create-title">Title:</label>
                        <input type="text" id="create-title" name="title" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="create-category">Category:</label>
                        <input type="text" id="create-category" name="category" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="create-content">Content:</label>
                        <textarea name="content" id="create-content"></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Create">
                    </p>

                </fieldset>
            </form>
        </section>
`;



export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        if (title == "" || category == "" || content == "") {
            return alert('All fields are required!')
        }

        if (category != "JavaScript" && category != "C#" && category != "Java" && category != "Python") {
            return alert('Invalid category!')
        }
        await createArticle({ title, category, content });
        ctx.page.redirect('/');

    }
}