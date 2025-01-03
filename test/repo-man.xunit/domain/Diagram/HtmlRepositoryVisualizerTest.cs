using Moq;

namespace repo_man.xunit.domain.Diagram
{
    public class HtmlRepositoryVisualizerTest: TestBase
    {
        public HtmlRepositoryVisualizerTest() { }

        [Fact]
        public async Task WritesRepoDataToFileAndGeneratesDiagram()
        {
            var tree = new GitTree();
            _mocker.GetMock<ITreeExtracter>().Setup(x => x.GetFileTree()).Returns(tree);

            var target = _mocker.CreateInstance<HtmlRepositoryVisualizer>();

            await target.GenerateDiagram();

            _mocker.GetMock<JsonGitTreeWriter>().Verify(x => x.WriteTreeToFile(tree), Times.Once);
            _mocker.GetMock<HtmlDiagramBuilder>().Verify(x => x.BuildHtmlFile(), Times.Once);
        }
    }
}
