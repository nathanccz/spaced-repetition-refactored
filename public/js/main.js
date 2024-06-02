document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.autocomplete');
    const options = {
      data:  {
            "HTML5": null,
            "CSS3": null,
            "JavaScript": null,
            "Node.js": null,
            "React": null,
            "MongoDB": null,
            "Mongoose": null,
            "PostgreSQL": null,
            "Angular": null,
            "TypeScript": null,
            "Ruby on Rails": null,
            "Laravel": null,
            "Go": null,
            "Rust": null,
        }
    }
    let instances = M.Autocomplete.init(elems, options);
})