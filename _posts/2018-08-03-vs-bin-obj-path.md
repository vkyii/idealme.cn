---
title: Visual Studio 配置bin和obj目录
tags: VS, .NetCore
notebook: 软件工具
---
# 配置
本来只需要在`.csproj`文件里面配置就可以了
* `BaseIntermediateOutputPath` obj目录
* `BaseOutputPath` bin目录

但是vs有个bug,大概是nuget部分导入信息是在SDK导入之前,所以`obj`目录先被建立出来

# 解决方案1
建立`Directory.Build.props`文件,在里面先配置字段,会先于项目文件加载
```xml
<Project>
 <PropertyGroup>
    <BaseIntermediateOutputPath>.obj</BaseIntermediateOutputPath>
    <BaseOutputPath>.bin</BaseOutputPath>
 </PropertyGroup>
</Project>
```

# 解决方案2
修改`.csproj`项目文件:
```xml
<Project>
  <!-- This needs to be set before Sdk.props -->
  <PropertyGroup>
    <BaseIntermediateOutputPath>.obj</BaseIntermediateOutputPath>
    <BaseOutputPath>.bin</BaseOutputPath>
  </PropertyGroup>

  <Import Project="Sdk.props" Sdk="Microsoft.NET.Sdk" />

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
  </PropertyGroup>

  <!-- other content -->

  <Import Project="Sdk.targets" Sdk="Microsoft.NET.Sdk" />
</Project>
```

# 参考
* [Setting BaseIntermediateOutputPath correctly in a SDK-based project is hard](https://github.com/Microsoft/msbuild/issues/1603)
* [MSBuild nuget RestoreOutputPath how to make it work?](https://stackoverflow.com/questions/45575280/msbuild-nuget-restoreoutputpath-how-to-make-it-work)
* [Customize your build](https://docs.microsoft.com/en-us/visualstudio/msbuild/customize-your-build)

---
> EverMonkey:/vk.blog/soft/2018-08-03-vs-bin-obj-path.md

