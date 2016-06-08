/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);
    
    var apis = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    
    return apis;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }
    
    function findAllPagesForWebsite(websiteId) {
        return Page.find({"_website": websiteId});
    }
    
    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        return Page.update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};