using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using repo_man.domain.Git;

namespace repo_man.domain.Diagram;

public class HtmlRepositoryVisualizer
{
    private readonly ILogger<HtmlRepositoryVisualizer> _logger;
    private readonly ITreeExtracter _extracter;
    private readonly IConfiguration _configuration;
    private readonly JsonGitTreeWriter _treeWriter;
    private readonly HtmlDiagramBuilder _htmlBuilder; 

    public HtmlRepositoryVisualizer(ILogger<HtmlRepositoryVisualizer> logger, ITreeExtracter extracter, IConfiguration configuration, JsonGitTreeWriter treeWriter, HtmlDiagramBuilder htmlBuilder)
    {
        _logger = logger;
        _extracter = extracter;
        _configuration = configuration;
        _treeWriter = treeWriter;
        _htmlBuilder = htmlBuilder;
    }

    public virtual async Task GenerateDiagram()
    {
        try
        {
            _logger.LogInformation("Extracting files from repository");
            var tree = _extracter.GetFileTree();

            _logger.LogInformation("Writing repo data to file");
            await _treeWriter.WriteTreeToFile(tree);

            _logger.LogInformation("Creating a diagram of the repository file tree");
            await _htmlBuilder.BuildHtmlFile();

            _logger.LogInformation("Diagram creation complete!");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating diagram. Exiting.");
        }
    }
}