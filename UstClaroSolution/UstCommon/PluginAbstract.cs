
using Microsoft.Xrm.Sdk;
using System;
using UST;

namespace ITC.Helper
{
    public abstract class PluginAbstract<T> where T : Entity
    {
        #region Declaracion de variables globales
        
        public IPluginExecutionContext context      = null;
        public IOrganizationService iServices       = null;
        public UstServiceContext svcContext            = null;
        private IOrganizationServiceFactory factory = null;

        #endregion
        

        protected void InitializeServices(IServiceProvider serviceProvider)
        {
            context   = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            factory   = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            iServices = factory.CreateOrganizationService(context.UserId);

            svcContext = new UstServiceContext(iServices);
        }

        protected T GetTargetEntity()
        {
            if (!context.InputParameters.Contains("Target"))
            {
                //throw new ArgumentException("No fué posible obtener el target del contexto de ejecución.");
                return null;
            }

            return ((Entity)context.InputParameters["Target"]).ToEntity<T>();
        }      
        protected T GetPreImageEntity(string preImageName)
        {
            if (!context.PreEntityImages.Contains(preImageName))
            {
                throw new ArgumentException("No fué posible obtener la preImagen: " + preImageName);
            }
            return context.PreEntityImages[preImageName].ToEntity<T>();
        }
        protected T GetPostImageEntity(string postImageName)
        {
            if (!context.PostEntityImages.Contains(postImageName))
            {
                throw new ArgumentException("No fué posible obtener la PostImagen: " + postImageName);
            }
            return context.PostEntityImages[postImageName].ToEntity<T>();
        }

    
    }
}
