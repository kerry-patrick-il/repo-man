const repoInfo = {
  files: [
    {
      name: "README.md",
      size: 10,
      commits: 1,
      lastCommit: 120,
    },
    {
      name: "GettingStarted.md",
      size: 20,
      commits: 2,
      lastCommit: 100,
    },
  ],
  folders: [
    {
      name: "console",
      files: [
        {
          name: "Bootstrapper.cs",
          size: 120,
          commits: 1,
          lastCommit: 100,
        },
        {
          name: "Program.cs",
          size: 20,
          commits: 5,
          lastCommit: 60,
        },
      ],
      folders: [],
    },
    {
      name: "domain",
      files: [
        {
          name: "Model.cs",
          size: 150,
          commits: 1,
          lastCommit: 10,
        },
        {
          name: "Context.cs",
          size: 20,
          commits: 5,
          lastCommit: 6,
        },
      ],
      folders: [
        {
          name: "mappers",
          files: [
            {
              name: "ModelMapper.cs",
              size: 150,
              commits: 1,
              lastCommit: 10,
            },
            {
              name: "ContextMapper.cs",
              size: 20,
              commits: 5,
              lastCommit: 6,
            },
          ],
          folders: [
            {
              name: "impl",
              files: [
                {
                  name: "ModelMapperImpl.cs",
                  size: 1500,
                  commits: 1,
                  lastCommit: 10,
                },
                {
                  name: "ContextMapperImpl.cs",
                  size: 20,
                  commits: 5,
                  lastCommit: 6,
                },
              ],
            },
          ],
        },
        {
          name: "services",
          files: [
            {
              name: "ModelService.cs",
              size: 150,
              commits: 1,
              lastCommit: 10,
            },
            {
              name: "ContextService.cs",
              size: 20,
              commits: 5,
              lastCommit: 6,
            },
          ],
          folders: [
            {
              name: "impl",
              files: [
                {
                  name: "ModelServiceImpl.cs",
                  size: 150,
                  commits: 1,
                  lastCommit: 10,
                },
                {
                  name: "ContextServiceImpl.cs",
                  size: 20,
                  commits: 5,
                  lastCommit: 6,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default repoInfo;
