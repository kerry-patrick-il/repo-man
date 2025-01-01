using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using repo_man.domain.Git;

namespace repo_man.domain.Diagram;

public class HtmlRepositoryVisualizer
{
    private readonly ILogger<HtmlRepositoryVisualizer> _logger;
    private readonly ITreeExtracter _extracter;
    private readonly IDiagramRenderer _renderer;
    private readonly IConfiguration _configuration;

    public HtmlRepositoryVisualizer(ILogger<HtmlRepositoryVisualizer> logger, ITreeExtracter extracter, IDiagramRenderer renderer, IConfiguration configuration)
    {
        _logger = logger;
        _extracter = extracter;
        _renderer = renderer;
        _configuration = configuration;
    }

    public virtual Task GenerateDiagram()
    {
        try
        {
            _logger.LogInformation("Extracting files from repository");
            var tree = _extracter.GetFileTree();

            _logger.LogInformation("Writing repo data to file");

            _logger.LogInformation("Creating a diagram of the repository file tree");

            _logger.LogInformation("Diagram creation complete!");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating diagram. Exiting.");
        }

        return Task.CompletedTask;
    }
}